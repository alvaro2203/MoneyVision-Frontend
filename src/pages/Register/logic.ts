import { ChangeEvent, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { RegisterFormData } from '../../interfaces/RegisterFormData';
import { ApiErrorArray } from '../../interfaces/AuthErrorResponse';

export const useRegisterLogic = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    username: '',
    money: 0,
    email: '',
    password: '',
    repeatedPassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'money' ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    const { email, password, name, username, money, repeatedPassword } =
      formData;

    if (!email || !password || !name || !username || !money) {
      setError('Por favor introduzca los datos necesarios.');
      return false;
    }

    if (!/\S+@\S+.\S+/.test(email)) {
      setError('Por favor, ingresa un correo válido.');
      return false;
    }

    if (isNaN(money) || money < 0) {
      setError('Por favor, la cantidad introducida de dinero no es correcta.');
      return false;
    }

    if (password !== repeatedPassword) {
      setError('La contraseña no coincide.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { repeatedPassword, ...requiredData } = formData;
      const response = await api.post('/register', requiredData);

      response.status === 201
        ? navigate('/')
        : setError('Error de autenticación.' + response.data.message);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorArray>;

      const errorMessage =
        typeof axiosError.response?.data?.error === 'string'
          ? axiosError.response?.data?.error
          : axiosError.response?.data?.error[0];

      setError(errorMessage ?? 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
