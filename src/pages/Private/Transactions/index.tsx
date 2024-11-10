import { useState } from 'react';
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
import { Input } from '@/components/ui/input';

import { TYPE_OF_TRANSACTION_ENUM } from '@/consts';
import { Pencil, Search, Trash2 } from 'lucide-react';
import useUserStore from '@/store/userStore';
import useCategoryStore from '@/store/categoryStore';
import { cn } from '@/lib/utils';
import FormTransactions from '@/components/FormTransactions';

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const { categories } = useCategoryStore();
  const { user, deleteTransaction } = useUserStore();

  return (
    <div className='container max-w-4xl mx-auto px-4 py-8 space-y-10'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='text-left'>
              <CardTitle>Transacciones</CardTitle>
              <CardDescription>Gestiona tus ingresos y gastos</CardDescription>
            </div>
            <FormTransactions />
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
                          TYPE_OF_TRANSACTION_ENUM.Income
                          ? 'text-green-600'
                          : 'text-red-600'
                      )}
                    >
                      {transaction.typeOfTransaction ===
                      TYPE_OF_TRANSACTION_ENUM.Income
                        ? '+'
                        : '-'}
                      {transaction.amount.toFixed(2)} €
                    </TableCell>
                    <TableCell>
                      <div className='flex justify-end gap-2'>
                        <Button variant='ghost' size='icon'>
                          <Pencil className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => deleteTransaction(transaction._id)}
                        >
                          <Trash2 className='h-4 w-4' color='red' />
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
