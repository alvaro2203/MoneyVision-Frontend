// import Sidebar from '../Sidebar';

import Sidebar from '@/components/Sidebar';
import useAuth from '@/hooks/useAuth';
import useCategoryStore from '@/store/categoryStore';
import useUserStore from '@/store/userStore';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function PrivateLayout() {
  const { userId } = useAuth();
  const { getCategories, loading: loadingCategories } = useCategoryStore();
  const { getUserData, loading } = useUserStore();

  useEffect(() => {
    if (userId) {
      getUserData(userId);
      getCategories();
    }
  }, [userId, getUserData, getCategories]);

  if (loading || loadingCategories) return <h1>Loading...</h1>;

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <Outlet />
      </div>
    </div>
  );
}

export default PrivateLayout;
