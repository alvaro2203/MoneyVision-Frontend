// import Sidebar from '../Sidebar';

import Sidebar from '@/components/Sidebar';
import { Outlet } from 'react-router-dom';

function PrivateLayout() {
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
