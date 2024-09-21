import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { User } from '@/interfaces/User';
import { ApiError } from '@/interfaces/AuthErrorResponse';
import useAuth from './useAuth';
import api from '@/api/axios';

export const useGetUserData = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState<User>({
    _id: '',
    name: '',
    username: '',
    email: '',
    password: '',
    money: 0,
    transactions: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<User>(`/api/users/${userId}`);
        const userData = response.data;

        setUser({
          _id: userData._id || '',
          name: userData.name || '',
          username: userData.username || '',
          email: userData.email || '',
          password: userData.password || '',
          money: userData.money || 0,
          transactions: userData.transactions || [],
        });
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response) {
          setError(
            axiosError.response.data?.error ||
              'Error al cargar los datos del usuario'
          );
        } else if (axiosError.request) {
          setError('No se pudo conectar al servidor');
        } else {
          setError(axiosError.message || 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  return { userId, user, setUser, loading, error };
};
