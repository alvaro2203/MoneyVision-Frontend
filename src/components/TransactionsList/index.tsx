import { GetTransaction } from '@/interfaces/Transaction';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { TYPE_OF_TRANSACTION_INCOME } from '@/consts';
import { formatCurrency } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';

interface TransactionListProps {
  transactions: GetTransaction[];
  handleDelete: (transactionId: string | undefined) => Promise<void>;
}

export function TransactionList({
  transactions,
  handleDelete,
}: TransactionListProps) {
  return (
    <div className='space-y-4'>
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className='flex items-center gap-4 md:flex-row justify-between md:items-center'
        >
          <Avatar>
            <AvatarFallback
              className={
                transaction.typeOfTransaction === TYPE_OF_TRANSACTION_INCOME
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
              }
            >
              {transaction.category.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <p className='text-sm font-medium'>{transaction.description}</p>
            <p className='text-xs text-muted-foreground'>
              {transaction.category.name}
            </p>
          </div>
          <div className='text-right'>
            <p
              className={`text-sm font-medium ${
                transaction.typeOfTransaction === TYPE_OF_TRANSACTION_INCOME
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {transaction.typeOfTransaction === TYPE_OF_TRANSACTION_INCOME
                ? '+'
                : '-'}
              {formatCurrency(transaction.amount)}
            </p>
            <p className='text-xs text-muted-foreground'>
              {format(new Date(transaction.createdAt), 'dd/MM/yyyy')}
            </p>
          </div>

          <div className='flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-auto'>
            <div className='flex space-x-2 w-full md:w-auto'>
              <Button variant='outline' className='w-full md:w-auto'>
                <Pencil size={18} />
              </Button>
              <Button
                className='w-full md:w-auto'
                variant='destructive'
                onClick={() => handleDelete(transaction._id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
