import { useState, useEffect } from 'react';
import api from '@/api/axios';
import { Category } from '@/interfaces/Category';
import { ApiError } from '@/interfaces/AuthErrorResponse';
import { AxiosError } from 'axios';

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<Category[]>('/api/categories');
        setCategories(response.data);
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response) {
          setError(
            axiosError.response.data?.error ||
              'Error al cargar los datos del usuario'
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
};
