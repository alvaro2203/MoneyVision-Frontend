import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 
import { ArrowUpDown, BarChart3, CreditCard, DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TYPE_OF_TRANSACTION_ENUM,
  TYPE_OF_TRANSACTION_EXPENSE,
  TYPE_OF_TRANSACTION_INCOME,
} from '@/consts';
import { useHomeLogic } from './logic';
import { TransactionList } from '@/components/TransactionsList';
import InfoCard from '@/components/InfoCard';
import ChartDoughnut from '@/components/ChartDoughnut';

export default function Home() {
  const {
    user,
    formatCurrency,
    handleSubmit,
    transactionError,
    handleInputChange,
    handleSelectChange,
    handleDelete,
    totalIncomes,
    totalExpenses,
    newTransaction,
    isDialogOpen,
    setIsDialogOpen,
    loading,
    error,
    categories,
  } = useHomeLogic();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No se pudo cargar el usuario.</p>;

  return (
    <div className='container max-w-4xl mx-auto px-4 py-8 space-y-20'>
      <h1 className='text-3xl font-bold mb-8'>¡Bienvenido, {user.username}!</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8'>
        <InfoCard
          title='Saldo Total'
          icon={<DollarSign className='h-4 w-4 text-muted-foreground' />}
          isHighlighted={user.money + totalIncomes - totalExpenses < 30}
          highlightedClassName='bg-red-400'
        >
          <div className='text-2xl font-bold'>
            {formatCurrency(user.money + totalIncomes - totalExpenses)}
          </div>
          {user.money + totalIncomes - totalExpenses < 30 && (
            <p className='text-white text-center text-sm'>¡Saldo bajo!</p>
          )}
        </InfoCard>

        <InfoCard
          title='Número de Transacciones'
          icon={<BarChart3 className='h-4 w-4 text-muted-foreground' />}
        >
          <div className='text-2xl font-bold'>{user.transactions.length}</div>
        </InfoCard>

        <InfoCard
          title='Gastos Totales'
          icon={<CreditCard className='h-4 w-4 text-muted-foreground' />}
          isHighlighted={totalExpenses > totalIncomes}
          highlightedClassName='bg-red-400'
        >
          <div className='text-2xl font-bold'>
            {formatCurrency(totalExpenses)}
          </div>
          {totalExpenses > totalIncomes && (
            <p className='text-white text-center text-sm'>
              ¡Gastos demasiado elevados!
            </p>
          )}
        </InfoCard>

        <InfoCard
          title='Ingresos Totales'
          icon={<ArrowUpDown className='h-4 w-4 text-muted-foreground' />}
        >
          <div className='text-2xl font-bold'>
            {formatCurrency(totalIncomes)}
          </div>
        </InfoCard>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        <div className='flex-1'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center p-6'>
            <CardHeader className='p-0'>
              <CardTitle className='text-2xl font-bold'>
                Transacciones Recientes
              </CardTitle>
            </CardHeader>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className='w-full md:w-auto'>Añadir Transacción</Button>
              </DialogTrigger>
              <DialogContent className='max-w-full sm:max-w-md'>
                <DialogHeader>
                  <DialogTitle>Añadir Nueva Transacción</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <Label htmlFor='title'>Título</Label>
                    <Input
                      id='title'
                      name='title'
                      value={newTransaction.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor='description'>Descripción</Label>
                    <Input
                      id='description'
                      name='description'
                      value={newTransaction.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor='amount'>Cantidad</Label>
                    <Input
                      id='amount'
                      name='amount'
                      type='number'
                      step='0.01'
                      value={newTransaction.amount || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor='typeOfTransaction'>Tipo de Transacción</Label>
                    <Select
                      name='typeOfTransaction'
                      onValueChange={(value) =>
                        handleSelectChange('typeOfTransaction', value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Seleccionar tipo' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TYPE_OF_TRANSACTION_INCOME}>
                          {TYPE_OF_TRANSACTION_ENUM.Income}
                        </SelectItem>
                        <SelectItem value={TYPE_OF_TRANSACTION_EXPENSE}>
                          {TYPE_OF_TRANSACTION_ENUM.Expense}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='category'>Categoría</Label>
                    <Select
                      name='category'
                      value={newTransaction.category._id}
                      onValueChange={(value) =>
                        handleSelectChange('category', value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una categoría' />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {transactionError && (
                    <p className='text-red-500'>{transactionError}</p>
                  )}
                  <Button type='submit'>Guardar Transacción</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <CardContent className='pt-6 overflow-x-auto'>
            <TransactionList
              transactions={user.transactions}
              handleDelete={handleDelete}
              formatCurrency={formatCurrency}
            />
          </CardContent>
        </div>
        <div className='w-full md:w-2/3 lg:w-1/4 mx-auto'> 
          <Card className='p-4'>
            <CardHeader>
              <CardTitle className='text-xl font-bold'>Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartDoughnut />
              <div className='my-4'>
                <p className=''>Balance total : <span className={`font-bold ${(totalIncomes - totalExpenses) < 0 ? 'text-red-500' : 'text-green-500'}`}>{formatCurrency(totalIncomes - totalExpenses)}</span></p>
              </div>
            </CardContent> 
          </Card>
        </div>
      </div>
    </div>
  );
}
