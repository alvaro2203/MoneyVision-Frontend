import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  DollarSign,
} from 'lucide-react';

import useAuth from '@/hooks/useAuth';
import useUserStore from '@/store/userStore';
import { useEffect } from 'react';
import useCategoryStore from '@/store/categoryStore';
import InfoCard from '@/components/InfoCard';
import { RecentTransactions } from '@/components/RecentTransactions';
import ChartDoughnut from '@/components/ChartDoughnut';
import { cn, formatCurrency } from '@/lib/utils';

export default function Dashboard() {
  const { userId } = useAuth();
  const { getUserData, user, totalExpenses, totalIncomes, loading } =
    useUserStore();
  const { getCategories, loading: loadingCategories } = useCategoryStore();

  useEffect(() => {
    if (userId) {
      getUserData(userId);
      getCategories();
    }
  }, [userId, getUserData, getCategories]);

  if (loading || loadingCategories) return <h1>Loading...</h1>;

  return (
    <div className='container max-w-4xl mx-auto px-4 py-8 space-y-10'>
      <h1 className='text-3xl font-bold mb-8'>¡Bienvenido, {user.username}!</h1>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <InfoCard
          title='Balance Total'
          icon={<DollarSign className='h-4 w-4 text-green-500' />}
          isHighlighted={user.money < 30}
          highlightedClassName='bg-red-400'
        >
          <div className='text-2xl font-bold'>{formatCurrency(user.money)}</div>
          {user.money < 30 && (
            <p className='text-xs text-muted-foreground'>Balance bajo!</p>
          )}
        </InfoCard>

        <InfoCard
          title='Nº Transacciones'
          icon={<BarChart3 className='h-4 w-4 text-red-500' />}
        >
          <div className='text-2xl font-bold'>{user.transactions.length}</div>
        </InfoCard>

        <InfoCard
          title='Ingresos'
          icon={<ArrowUpRight className='h-4 w-4 text-green-500' />}
        >
          <div className='text-2xl font-bold'>
            {formatCurrency(totalIncomes)}
          </div>
        </InfoCard>

        <InfoCard
          title='Gastos'
          icon={<ArrowDownRight className='h-4 w-4 text-red-500' />}
          isHighlighted={totalExpenses > totalIncomes}
          highlightedClassName='bg-red-400'
        >
          <div className='text-2xl font-bold'>
            {formatCurrency(totalExpenses)}
          </div>
          {totalExpenses > totalIncomes && (
            <p className='text-xs'>¡Gastos demasiado elevados!</p>
          )}
        </InfoCard>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        <Card className='flex-1'>
          <div className='flex flex-col md:flex-row justify-between md:items-center'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold p-2'>
                Transacciones Recientes
              </CardTitle>
            </CardHeader>
          </div>
          <CardContent className='overflow-x-auto'>
            <RecentTransactions transactions={user.transactions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-left text-2xl font-bold p-2'>
              Resumen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartDoughnut />
            <div className='pt-10'>
              <p>
                Balance total :{' '}
                <span
                  className={cn(
                    'font-bold',
                    totalIncomes - totalExpenses < 0
                      ? 'text-red-500'
                      : 'text-green-500'
                  )}
                >
                  {formatCurrency(totalIncomes - totalExpenses)}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
