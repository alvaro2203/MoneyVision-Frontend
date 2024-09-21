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
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>¡Bienvenido, {user.username}!</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <Card
          className={`${
            user.money !== null &&
            user.money + totalIncomes - totalExpenses < 30
              ? 'bg-red-400'
              : ''
          }`}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Saldo Total</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {user.money !== null
                ? formatCurrency(user.money + totalIncomes - totalExpenses)
                : 'Cargando...'}
            </div>
            {user.money !== null &&
              user.money + totalIncomes - totalExpenses < 30 && (
                <p className='text-white text-center text-sm'>¡Saldo bajo!</p>
              )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Ingresos Totales
            </CardTitle>
            <ArrowUpDown className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatCurrency(totalIncomes)}
            </div>
          </CardContent>
        </Card>

        <Card
          className={`${totalExpenses > totalIncomes ? 'bg-red-400' : ''} `}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Gastos Totales
            </CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatCurrency(totalExpenses)}
            </div>
            {totalExpenses > totalIncomes && (
              <p className='text-white text-center text-sm'>
                ¡Gastos demasiado elevados!
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Número de Transacciones
            </CardTitle>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{user.transactions.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold'>Transacciones</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Añadir Transacción</Button>
          </DialogTrigger>
          <DialogContent>
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

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList
            transactions={user.transactions}
            handleDelete={handleDelete}
            formatCurrency={formatCurrency}
          />
          <div className='mt-4 text-center'>
            <Button variant='outline'>Ver Todas las Transacciones</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
