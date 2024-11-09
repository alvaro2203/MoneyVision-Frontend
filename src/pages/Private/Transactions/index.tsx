import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  TYPE_OF_TRANSACTION_ENUM,
  TYPE_OF_TRANSACTION_EXPENSE,
  TYPE_OF_TRANSACTION_INCOME,
} from '@/consts';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { Description } from '@radix-ui/react-dialog';
import useUserStore from '@/store/userStore';
import useCategoryStore from '@/store/categoryStore';
import { cn } from '@/lib/utils';
import { CreateTransaction } from '@/interfaces/Transaction';
import useAuth from '@/hooks/useAuth';

export function Transactions() {
  const { userId } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const {
    getCategories,
    categories,
    loading: loadingCategories,
  } = useCategoryStore();
  const {
    getUserData,
    user,
    loading,
    addTransaction,
    deleteTransaction,
    error,
  } = useUserStore();
  const [newTransaction, setNewTransaction] = useState<CreateTransaction>({
    description: '',
    amount: 0,
    typeOfTransaction: TYPE_OF_TRANSACTION_ENUM.Expense,
    category: '',
    user: user._id || '',
  });

  useEffect(() => {
    if (userId) {
      getUserData(userId);
      getCategories();
      setNewTransaction((prev) => ({ ...prev, ['user']: userId }));
    }
  }, [userId, getUserData, getCategories]);

  if (loading || loadingCategories) return <h1>Loading...</h1>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTransaction(newTransaction);
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='container max-w-4xl mx-auto px-4 py-8 space-y-10'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='text-left'>
              <CardTitle>Transacciones</CardTitle>
              <CardDescription>Gestiona tus ingresos y gastos</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className='mr-2 h-4 w-4' />
                  Nueva Transacción
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-full sm:max-w-md'>
                <Description>
                  Añade aquí la información de tu transacción
                </Description>

                <DialogHeader>
                  <DialogTitle>Añadir Nueva Transacción</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
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
                    <Label htmlFor='typeOfTransaction'>
                      Tipo de Transacción
                    </Label>
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
                      required
                      name='category'
                      value={newTransaction.category}
                      onValueChange={(value) =>
                        handleSelectChange('category', value)
                      }
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
                  {error && <p className='text-red-500'>{error}</p>}
                  <Button type='submit'>Guardar Transacción</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4 mb-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Buscar transacciones...'
                className='pl-8'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Categoría' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className='text-right'>Cantidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='text-left'>
                {user.transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category.name}</TableCell>
                    <TableCell
                      className={cn(
                        'text-right',
                        transaction.typeOfTransaction ===
                          TYPE_OF_TRANSACTION_INCOME
                          ? 'text-green-600'
                          : 'text-red-600'
                      )}
                    >
                      {transaction.typeOfTransaction ===
                      TYPE_OF_TRANSACTION_INCOME
                        ? '+'
                        : '-'}
                      {transaction.amount.toFixed(2)} €
                    </TableCell>
                    <TableCell>
                      <div className='flex space-x-2 w-full md:w-auto justify-end'>
                        <Button variant='outline' className='w-full md:w-auto'>
                          <Pencil size={18} />
                        </Button>
                        <Button
                          className='w-full md:w-auto'
                          variant='destructive'
                          onClick={() => deleteTransaction(transaction._id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
