import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.get('/auth/verify');

        if (response.status === 200) {
          setAuthenticated(true);
          setUserId(response.data.userId);
        } else {
          setAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        setAuthenticated(false);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, [navigate]);

  return { authenticated, loading, userId };
};

export default useAuth;
