import api from '@/api/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import { Transaction } from '@/interfaces/Transaction';
import { User } from '@/interfaces/User';
import { ArrowUpDown, BarChart3, CreditCard, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { userId } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUserData = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await api.get<User>(`/api/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      setError('Error getting user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) { 
      getUserData();
    }
  }, [userId]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
function formatCurrency(amount: number | undefined) {
  return `$${amount.toFixed(2)}`
}


function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
          <div>
            <p className="font-semibold">{transaction.description}</p>
            <p className="text-sm text-gray-500">{transaction.date}</p>
          </div>
          <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(transaction.amount)}
          </p>
        </div>
      ))}
    </div>
  )
}

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.username}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(user?.money)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Count</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList transactions={[
          ]} />
          <div className="mt-4 text-center">
            <Button variant="outline">View All Transactions</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Username:</strong> [Username]</p>
          <p><strong>Email:</strong> [Email]</p>
        </CardContent>
      </Card>
    </div>
  )
}
