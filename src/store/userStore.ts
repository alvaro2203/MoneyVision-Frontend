// src/store/userStore.ts
import { create } from 'zustand';
import { AxiosError } from 'axios';
import { User } from '@/interfaces/User';
import { ApiError } from '@/interfaces/AuthErrorResponse';
import api from '@/api/axios';
import { TYPE_OF_TRANSACTION_ENUM } from '@/consts';
import { CreateTransaction } from '@/interfaces/Transaction';

interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
  totalIncomes: number;
  totalExpenses: number;
  getUserData: (userId: string) => Promise<void>;
  setUser: (user: User) => void;
  deleteTransaction: (transactionId: string | undefined) => Promise<void>;
  addTransaction: (newTransaction: CreateTransaction) => Promise<void>;
}

const useUserStore = create<UserState>((set, get) => ({
  user: {
    _id: '',
    name: '',
    username: '',
    email: '',
    password: '',
    money: 0,
    transactions: [],
  },
  loading: false,
  error: null,
  totalExpenses: 0,
  totalIncomes: 0,

  getUserData: async (userId: string) => {
    if (!userId) return;

    set({ loading: true, error: null });

    try {
      const response = await api.get<User>(`/api/users/${userId}`);
      const userData = response.data;

      set({
        user: {
          _id: userData._id || '',
          name: userData.name || '',
          username: userData.username || '',
          email: userData.email || '',
          password: userData.password || '',
          money: userData.money || 0,
          transactions: userData.transactions || [],
        },
        loading: false,
        error: null,
        totalIncomes: userData.transactions
          .filter((transaction) => transaction.typeOfTransaction === 'Income')
          .reduce((total, transaction) => total + transaction.amount, 0),
        totalExpenses: userData.transactions
          .filter((transaction) => transaction.typeOfTransaction === 'Expense')
          .reduce((total, transaction) => total + transaction.amount, 0),
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      let errorMessage = 'Error desconocido';

      if (axiosError.response) {
        errorMessage =
          axiosError.response.data?.error ||
          'Error al cargar los datos del usuario';
      } else if (axiosError.request) {
        errorMessage = 'No se pudo conectar al servidor';
      } else {
        errorMessage = axiosError.message;
      }

      set({ error: errorMessage, loading: false });
    }
  },

  setUser: (user) => set({ user }),

  deleteTransaction: async (transactionId: string | undefined) => {
    try {
      await api.delete(`/api/transactions/${transactionId}`);

      set((state) => ({
        user: {
          ...state.user,
          transactions: state.user.transactions.filter(
            (transaction) => transaction._id !== transactionId
          ),
        },
      }));

      set({
        totalIncomes: get()
          .user.transactions.filter(
            (transaction) => transaction.typeOfTransaction === 'Income'
          )
          .reduce((total, transaction) => total + transaction.amount, 0),
        totalExpenses: get()
          .user.transactions.filter(
            (transaction) => transaction.typeOfTransaction === 'Expense'
          )
          .reduce((total, transaction) => total + transaction.amount, 0),
      });
    } catch (error) {
      console.error('Error al eliminar la transacción', error);
    }
  },

  addTransaction: async (newTransaction: CreateTransaction) => {
    try {
      const response = await api.post('/api/transactions', newTransaction);
      const addedTransaction = response.data;

      const updatedBalance =
        addedTransaction.typeOfTransaction === TYPE_OF_TRANSACTION_ENUM.Income
          ? get().user.money + addedTransaction.amount
          : get().user.money - addedTransaction.amount;

      set((state) => ({
        user: {
          ...state.user,
          money: updatedBalance,
          transactions: [...state.user.transactions, addedTransaction],
        },
      }));

      set({
        totalIncomes: get()
          .user.transactions.filter(
            (transaction) => transaction.typeOfTransaction === 'Income'
          )
          .reduce((total, transaction) => total + transaction.amount, 0),
        totalExpenses: get()
          .user.transactions.filter(
            (transaction) => transaction.typeOfTransaction === 'Expense'
          )
          .reduce((total, transaction) => total + transaction.amount, 0),
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      console.error(
        axiosError.response?.data?.error || 'Error al añadir la transacción'
      );
    }
  },
}));

export default useUserStore;
