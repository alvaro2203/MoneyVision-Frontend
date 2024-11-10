import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Description } from '@radix-ui/react-dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useState } from 'react';
import { TYPE_OF_TRANSACTION_ENUM } from '@/consts';
import { CreateTransaction } from '@/interfaces/Transaction';
import useCategoryStore from '@/store/categoryStore';
import useUserStore from '@/store/userStore';

function FormTransactions() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { categories } = useCategoryStore();
  const { user, addTransaction, error } = useUserStore();
  const [newTransaction, setNewTransaction] = useState<CreateTransaction>({
    description: '',
    amount: 0,
    typeOfTransaction: TYPE_OF_TRANSACTION_ENUM.Expense,
    category: '',
    user: user._id || '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTransaction(newTransaction);
    setIsDialogOpen(false);
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Nueva Transacción
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-full sm:max-w-md'>
        <Description>¿Que quieres añadir?</Description>

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
            <Label htmlFor='typeOfTransaction'>Tipo de Transacción</Label>
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
                <SelectItem value={TYPE_OF_TRANSACTION_ENUM.Income}>
                  {TYPE_OF_TRANSACTION_ENUM.Income}
                </SelectItem>
                <SelectItem value={TYPE_OF_TRANSACTION_ENUM.Expense}>
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
              onValueChange={(value) => handleSelectChange('category', value)}
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
  );
}

export default FormTransactions;
