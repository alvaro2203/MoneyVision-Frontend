import Header from '@/components/Header';
import { Outlet, useLocation } from 'react-router-dom';

function PublicLayout() {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/register'];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {showHeader && (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <Header />
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default PublicLayout;
