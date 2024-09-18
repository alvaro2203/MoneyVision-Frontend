import api from '@/api/axios';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import { User } from '@/interfaces/User';
import { ArrowUpDown, BarChart3, CreditCard, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    money: 0,
    transactions: [],
  });
  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

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

  const getTotalIncomes = () => {
    const totalIncomes = user.transactions
      .filter((transaction) => transaction.typeOfTransaction === 'Income') 
      .reduce((total, transaction) => total + transaction.amount, 0);
  
    setTotalIncomes((totalIncomes)); 
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

  function TransactionList( ) {
    return (
      <div className='space-y-4'>
        
        {user.transactions.map((transaction, index) => (
          <div
            key={index}
            className='flex justify-between items-center p-4 bg-gray-200 rounded-lg'
          >
            <div className='text-left'>
              <p className='font-semibold text-gray-800'>{transaction.title}</p>
              <p className='text-sm text-gray-600'>{transaction.description}</p>
            </div>
            <p
              className={`font-bold ${
                transaction.typeOfTransaction === 'Income' ? 'text-emerald-600' : 'text-red-500'
              }`}
            >
              {formatCurrency(transaction.amount)}
            </p>
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
      <Card className={`${user.money + totalIncomes - totalExpenses < 30 ? 'bg-red-400' : ''}`}>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Saldo Total</CardTitle>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {formatCurrency(user.money + totalIncomes - totalExpenses)}
          </div>
          {user.money + totalIncomes - totalExpenses < 30 && (
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
            <CardTitle className='text-sm font-medium'>
              Gastos Totales
            </CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(totalExpenses)}</div>
            {totalExpenses > totalIncomes  && (
            <p className='text-white text-center text-sm'>¡Gastos demasiado elevados!</p>
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

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Transacciones</CardTitle>
        </CardHeader>
        <CardContent>
        <TransactionList transactions={[]} />
        <div className='mt-4 text-center'>
            <Button variant='outline'>Ver Todas las Transacciones</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}