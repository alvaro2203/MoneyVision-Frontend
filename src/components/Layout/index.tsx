import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import LandingPage from '@/pages/LandingPage';
import AboutPage from '@/pages/About';
import TestimonialsPage from '@/pages/Testimonials';
import FeaturesPage from '@/pages/Features';
import PrivateRoute from '../PrivateRoute';
import Home from '@/pages/Home';

export function Layout() {
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

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/testimonials' element={<TestimonialsPage />} />
        <Route path='/features' element={<FeaturesPage />} />

        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
