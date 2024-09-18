import api from '@/api/axios';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import { User } from '@/interfaces/User';
import { ArrowUpDown, BarChart3, CreditCard, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Transaction } from '@/interfaces/Transaction';
import { Category } from '@/interfaces/Category';
import { TYPE_OF_TRANSACTION_ENUM, TYPE_OF_TRANSACTION_EXPENSE, TYPE_OF_TRANSACTION_INCOME } from '@/consts';

export default function Home() {
  const { userId } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    username: '',
    email: '',
    password: '',
    money: null,
    transactions: [],
  });
  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    title: '',
    description: '',
    amount: 0,
    typeOfTransaction: '',
    category: '',
    user: userId || '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewTransaction(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      console.log(newTransaction);
      const response = await api.post('/api/transactions', newTransaction);
      const addedTransaction = response.data;
      setTransactionError(null); 

      setUser(prev => ({
        ...prev,
        transactions: [...prev.transactions, addedTransaction]
      }));

     
    } catch (error) {
      setTransactionError('Error al añadir la transacción');
    } finally {
      setNewTransaction({
        title: '',
        description: '',
        amount: 0,
        typeOfTransaction: '',
        category: '',
        user: userId
      });
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (transactionId: string) => {
    try {
      await api.delete(`/api/transactions/${transactionId}`);
      setUser(prev => ({
        ...prev,
        transactions: prev.transactions.filter(t => t._id !== transactionId)
      }));
    } catch (error) {
      console.error('Error al eliminar la transacción', error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<User>(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError('Error al obtener los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    if (userId) getUserData();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setNewTransaction(prev => ({ ...prev, user: userId }));
    }
  }, [userId]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      setError(null);
  
      try {
        const response = await api.get<Category[]>('/api/categories');
        setCategories(response.data);
      } catch (error) {
        setError("Error al obtener las categorías")
      } finally {
        setLoading(false)
      }
    }
    getCategories()
  }, [])
  

  const getTotalIncomes = () => {
    const totalIncomes = user.transactions
      .filter((transaction) => transaction.typeOfTransaction === 'Income') 
      .reduce((total, transaction) => total + transaction.amount, 0);
  
    setTotalIncomes(totalIncomes); 
  };
  
  const getTotalExpenses = () => {
    const totalExpenses = user.transactions
      .filter((transaction) => transaction.typeOfTransaction === 'Expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
    setTotalExpenses(totalExpenses); 
  };

  useEffect(() => {
    getTotalIncomes();
    getTotalExpenses();
  }, [user.transactions]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  
  const formatCurrency = (amount: number) => `${amount.toFixed(2)} €`;


  function TransactionList() {
    return (
      <div className='space-y-4'>
        {user.transactions.map((transaction, index) => (
          <div
            key={transaction._id} // Usa un identificador único en lugar de `index`
            className='flex justify-between items-center p-4 bg-gray-200 rounded-lg'
          >
            <div className='text-left'>
              <p className='font-semibold text-gray-800'>{transaction.title}</p>
              <p className='text-sm text-gray-600'>{transaction.description}</p>
            </div>
            <div className='flex items-center space-x-4'>
              <p
                className={`font-bold ${
                  transaction.typeOfTransaction === 'Income' ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {formatCurrency(transaction.amount)}
              </p>
              <Button
                variant='outline'
                className='mr-2'
              >
                Editar
              </Button>
              <Button
                variant='destructive'
                onClick={() => handleDelete(transaction._id)}
              >
                Borrar
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <Header />
      </div>
      <h1 className='text-3xl font-bold mb-8'>¡Bienvenido, {user.username}!</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <Card className={`${user.money !== null && user.money + totalIncomes - totalExpenses < 30 ? 'bg-red-400' : ''}`}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Saldo Total</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {user.money !== null ? formatCurrency(user.money + totalIncomes - totalExpenses) : 'Cargando...'}
            </div>
            {user.money !== null && user.money + totalIncomes - totalExpenses < 30 && (
              <p className='text-white text-center text-sm'>¡Saldo bajo!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Ingresos Totales</CardTitle>
            <ArrowUpDown className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(totalIncomes)}</div>
          </CardContent>
        </Card>

        <Card className={`${totalExpenses > totalIncomes ? 'bg-red-400' : ''} `}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Gastos Totales</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(totalExpenses)}</div>
            {totalExpenses > totalIncomes && (
              <p className='text-white text-center text-sm'>¡Gastos demasiado elevados!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Número de Transacciones</CardTitle>
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
                <Input id='title' name='title' value={newTransaction.title} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor='description'>Descripción</Label>
                <Input id='description' name='description' value={newTransaction.description} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor='amount'>Cantidad</Label>
                <Input id='amount' name='amount' type='number' step='0.01' value={newTransaction.amount || ''} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor='typeOfTransaction'>Tipo de Transacción</Label>
                <Select name='typeOfTransaction' onValueChange={(value) => handleSelectChange('typeOfTransaction', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TYPE_OF_TRANSACTION_INCOME}>{TYPE_OF_TRANSACTION_ENUM.Income}</SelectItem>
                    <SelectItem value={TYPE_OF_TRANSACTION_EXPENSE}>{TYPE_OF_TRANSACTION_ENUM.Expense}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='category'>Categoría</Label>
                <Select
                  id='category'
                  value={newTransaction.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
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
              {transactionError && <p className='text-red-500'>{transactionError}</p>}
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
          <TransactionList />
          <div className='mt-4 text-center'>
            <Button variant='outline'>Ver Todas las Transacciones</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
