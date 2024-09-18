import { Transaction } from '@/interfaces/Transaction';
import { Button } from '../ui/button';

interface TransactionListProps {
  transactions: Transaction[];
  handleDelete: (transactionId: string) => Promise<void>;
  formatCurrency: (amount: number) => string;
}

export function TransactionList({
  transactions,
  handleDelete,
  formatCurrency,
}: TransactionListProps) {
  return (
    <div className='space-y-4'>
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className='flex justify-between items-center p-4 bg-gray-200 rounded-lg'
        >
          <div className='text-left'>
            <p className='font-semibold text-gray-800'>{transaction.title}</p>
            <p className='text-sm text-gray-600'>{transaction.description}</p>
          </div>
          <div className='flex items-center space-x-4'>
            <p
              className={`font-bold ${
                transaction.typeOfTransaction === 'Income'
                  ? 'text-emerald-600'
                  : 'text-red-500'
              }`}
            >
              {formatCurrency(transaction.amount)}
            </p>
            <Button variant='outline' className='mr-2'>
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
