import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import useCategoryStore from '@/store/categoryStore';
import { CreateCategory } from '@/interfaces/Category';

export function Categories() {
  const { categories, addCategory, deleteCategory } = useCategoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategory, setNewCategory] = useState<CreateCategory>({
    name: '',
    color: '#000000',
    description: '',
  });

  const handleSaveCategory = () => {
    addCategory(newCategory);

    setNewCategory({
      name: '',
      color: '#000000',
      description: '',
    });
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container max-w-4xl mx-auto px-4 py-8 space-y-10'>
      <Card>
        <CardHeader>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div className='text-left'>
              <CardTitle>Gestión de Categorías</CardTitle>
              <CardDescription>
                Administra las categorías para tus transacciones
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className='mr-2 h-4 w-4' />
                  Nueva Categoría
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nueva Categoría</DialogTitle>
                  <DialogDescription>
                    Crea una nueva categoría para clasificar tus transacciones
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>Nombre</Label>
                    <Input
                      id='name'
                      value={newCategory.name}
                      onChange={(e) =>
                        setNewCategory({ ...newCategory, name: e.target.value })
                      }
                    />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='color'>Color</Label>
                    <Input
                      id='color'
                      type='color'
                      value={newCategory.color}
                      onChange={(e) =>
                        setNewCategory({
                          ...newCategory,
                          color: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='description'>Descripción</Label>
                    <Input
                      id='description'
                      value={newCategory.description}
                      onChange={(e) =>
                        setNewCategory({
                          ...newCategory,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSaveCategory}>Guardar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Buscar categorías...'
                className='pl-8'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Color</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='text-left'>
                  {filteredCategories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>
                        <div
                          className='w-6 h-6 rounded-full'
                          style={{ backgroundColor: category.color }}
                        />
                      </TableCell>
                      <TableCell className='font-medium'>
                        {category.name}
                      </TableCell>

                      <TableCell>{category.description}</TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button variant='ghost' size='icon'>
                            <Pencil className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => handleDeleteCategory(category._id)}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
