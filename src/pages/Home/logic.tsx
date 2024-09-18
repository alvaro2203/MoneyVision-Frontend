import api from '@/api/axios';
import useAuth from '@/hooks/useAuth';
import { User } from '@/interfaces/User';
import { useEffect, useState } from 'react';
import { Transaction } from '@/interfaces/Transaction';
import { Category } from '@/interfaces/Category';
import { TYPE_OF_TRANSACTION_ENUM } from '@/consts';

export const useHomeLogic = () => {
  const { userId } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    username: '',
    email: '',
    password: '',
    money: 0,
    transactions: [],
  });
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    title: '',
    description: '',
    amount: 0,
    typeOfTransaction: TYPE_OF_TRANSACTION_ENUM.Expense,
    category: {
      _id: '',
      name: '',
      description: '',
    },
    user: userId || '',
  });

  useEffect(() => {
    if (userId) setNewTransaction((prev) => ({ ...prev, user: userId }));
  }, [userId]);

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

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<Category[]>('/api/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Error al obtener las categorías');
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getTotalIncomes = () => {
      const totalIncomes = user.transactions
        .filter((transaction) => transaction.typeOfTransaction === 'Income')
        .reduce((total, transaction) => total + transaction.amount, 0);

      setTotalIncomes(totalIncomes);
    };

    const getTotalExpenses = () => {
      const totalExpenses = user.transactions
        .filter((transaction) => transaction.typeOfTransaction === 'Expense')
        .reduce((total, transaction) => total + transaction.amount, 0);
      setTotalExpenses(totalExpenses);
    };

    getTotalIncomes();
    getTotalExpenses();
  }, [user.transactions]);

  const handleSelectChange = (name: string, value: string) =>
    setNewTransaction((prev) => ({ ...prev, [name]: value }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleDelete = async (transactionId: string) => {
    try {
      await api.delete(`/api/transactions/${transactionId}`);
      setUser((prev) => ({
        ...prev,
        transactions: prev.transactions.filter((t) => t._id !== transactionId),
      }));
    } catch (error) {
      console.error('Error al eliminar la transacción', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/transactions', newTransaction);
      const addedTransaction = response.data;
      setTransactionError(null);

      setUser((prev) => ({
        ...prev,
        transactions: [...prev.transactions, addedTransaction],
      }));
    } catch (error) {
      setTransactionError('Error al añadir la transacción');
    } finally {
      setNewTransaction({
        title: '',
        description: '',
        amount: 0,
        typeOfTransaction: TYPE_OF_TRANSACTION_ENUM.Expense,
        category: {
          _id: '',
          name: '',
          description: '',
        },
        user: userId,
      });
      setIsDialogOpen(false);
    }
  };

  const formatCurrency = (amount: number) => `${amount.toFixed(2)} €`;

  return {
    userId,
    user,
    setUser,
    formatCurrency,
    handleSubmit,
    transactionError,
    handleInputChange,
    handleSelectChange,
    totalIncomes,
    totalExpenses,
    newTransaction,
    isDialogOpen,
    setIsDialogOpen,
    loading,
    error,
    setLoading,
    setError,
    categories,
    handleDelete,
  };
};
