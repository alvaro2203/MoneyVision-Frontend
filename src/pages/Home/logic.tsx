import api from '@/api/axios';
import { useEffect, useState } from 'react';
import { Transaction } from '@/interfaces/Transaction';
import { TYPE_OF_TRANSACTION_ENUM } from '@/consts';
import { useGetUserData } from '@/hooks/useGetUserData';
import { useGetCategories } from '@/hooks/useGetCategories';
import { AxiosError } from 'axios';
import { ApiError } from '@/interfaces/AuthErrorResponse';

export const useHomeLogic = () => {
  const {
    user,
    loading: userLoading,
    error: userError,
    setUser,
  } = useGetUserData();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategories();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    title: '',
    description: '',
    amount: 0,
    typeOfTransaction: TYPE_OF_TRANSACTION_ENUM.Expense,
    category: '',
    user: user._id || '',
  });

  useEffect(() => {
    if (user._id) setNewTransaction((prev) => ({ ...prev, user: user._id }));
  }, [user._id]);

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

  const handleDelete = async (transactionId: string | undefined) => {
    try {
      await api.delete(`/api/transactions/${transactionId}`);
      setUser((prev) => ({
        ...prev,
        transactions: prev.transactions.filter(
          (transaction) => transaction._id !== transactionId
        ),
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

      setIsDialogOpen(false);
      setNewTransaction({
        title: '',
        description: '',
        amount: 0,
        typeOfTransaction: TYPE_OF_TRANSACTION_ENUM.Expense,
        category: '',
        user: user._id,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        setTransactionError(
          axiosError.response.data?.error || 'Error al añadir la transacción'
        );
      }
    }
  };

  const formatCurrency = (amount: number) => `${amount.toFixed(2)} €`;

  return {
    user,
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
    loading: userLoading || categoriesLoading,
    error: userError || categoriesError,
    categories,
    handleDelete,
  };
};
