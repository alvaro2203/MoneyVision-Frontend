import { GetTransaction } from '@/interfaces/Transaction';
import { format } from 'date-fns';
import Button from '../button';

interface TransactionListProps {
  transactions: GetTransaction[];
  handleDelete: (transactionId: string | undefined) => Promise<void>;
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
          className='flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-200 rounded-lg space-y-4 md:space-y-0'
        >
          <div className='text-left space-y-1'>
            <p className='font-semibold text-gray-800'>
              {transaction.description}
              <span className='text-sm text-gray-500'>
                {' '}
                - {transaction.category.name || 'Sin categoria'}
              </span>
            </p>
            {transaction.createdAt && (
              <p className='text-xs text-gray-500'>
                {format(new Date(transaction.createdAt), 'dd/MM/yyyy')}
              </p>
            )}
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-auto'>
            <p
              className={`font-bold ${
                transaction.typeOfTransaction === 'Income'
                  ? 'text-emerald-600'
                  : 'text-red-500'
              }`}
            >
              {formatCurrency(transaction.amount)}
            </p>
            <div className='flex space-x-2 w-full md:w-auto'>
              <Button variant='secondary' className='w-full md:w-auto'>
                Editar
              </Button>
              <Button
                className='w-full md:w-auto'
                variant='danger'
                onClick={() => handleDelete(transaction._id)}
              >
                Borrar
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
