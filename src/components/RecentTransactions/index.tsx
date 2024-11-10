import { GetTransaction } from '@/interfaces/Transaction';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { TYPE_OF_TRANSACTION_ENUM } from '@/consts';
import { formatCurrency } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface TransactionListProps {
  transactions: GetTransaction[];
}

export function RecentTransactions({ transactions }: TransactionListProps) {
  return (
    <ScrollArea className='h-[230px] p-2'>
      <div className='space-y-4'>
        {transactions.map((transaction) => (
          <div key={transaction._id} className='flex items-center gap-4'>
            <Avatar>
              <AvatarFallback
                className={
                  transaction.typeOfTransaction ===
                  TYPE_OF_TRANSACTION_ENUM.Income
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }
              >
                {transaction.category.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 text-left'>
              <p className='text-sm font-medium'>{transaction.description}</p>
              <p className='text-xs text-muted-foreground'>
                {transaction.category.name}
              </p>
            </div>
            <div className='text-right'>
              <p
                className={`text-sm font-medium ${
                  transaction.typeOfTransaction ===
                  TYPE_OF_TRANSACTION_ENUM.Income
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.typeOfTransaction ===
                TYPE_OF_TRANSACTION_ENUM.Income
                  ? '+'
                  : '-'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className='text-xs text-muted-foreground'>
                {format(new Date(transaction.createdAt), 'dd/MM/yyyy')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
