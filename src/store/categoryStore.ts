// src/store/categoryStore.ts
import { create } from 'zustand';
import { AxiosError } from 'axios';
import api from '@/api/axios';
import { Category } from '@/interfaces/Category';
import { ApiError } from '@/interfaces/AuthErrorResponse';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  getCategories: () => Promise<void>;
  addCategory: (newCategory: Category) => Promise<void>;
  updateCategory: (
    categoryId: string,
    updatedData: Partial<Category>
  ) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  error: null,

  getCategories: async () => {
    set({ loading: true, error: null });

    try {
      const response = await api.get<Category[]>('/api/categories');
      set({ categories: response.data, loading: false });
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      set({
        error:
          axiosError.response?.data?.error || 'Error al cargar las categorías',
        loading: false,
      });
    }
  },

  addCategory: async (newCategory) => {
    set({ loading: true, error: null });

    try {
      const response = await api.post<Category>('/api/categories', newCategory);
      set((state) => ({
        categories: [...state.categories, response.data],
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      set({
        error:
          axiosError.response?.data?.error || 'Error al añadir la categoría',
        loading: false,
      });
    }
  },

  updateCategory: async (categoryId, updatedData) => {
    set({ loading: true, error: null });

    try {
      const response = await api.put<Category>(
        `/api/categories/${categoryId}`,
        updatedData
      );
      set((state) => ({
        categories: state.categories.map((category) =>
          category._id === categoryId ? response.data : category
        ),
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      set({
        error:
          axiosError.response?.data?.error ||
          'Error al actualizar la categoría',
        loading: false,
      });
    }
  },

  deleteCategory: async (categoryId) => {
    set({ loading: true, error: null });

    try {
      await api.delete(`/api/categories/${categoryId}`);
      set((state) => ({
        categories: state.categories.filter(
          (category) => category._id !== categoryId
        ),
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      set({
        error:
          axiosError.response?.data?.error || 'Error al eliminar la categoría',
        loading: false,
      });
    }
  },
}));

export default useCategoryStore;
