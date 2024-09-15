import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export const useLoginLogic = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('Por favor introduzca los datos');
      return false;
    }

    if (!/\S+@\S+.\S+/.test(email)) {
      setError('Por favor, ingresa un correo válido.');
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
      const response = await api.post('/login', { email, password });

      response.status === 200
        ? navigate('/')
        : setError('Error de autenticación.' + response.data.message);
    } catch (error) {
      setError('Error de autenticación.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    error,
    handleSubmit,
  };
};
