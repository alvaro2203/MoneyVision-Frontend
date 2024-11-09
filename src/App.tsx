import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '@/pages/Public/LandingPage';
import AboutPage from '@/pages/Public/About';
import TestimonialsPage from '@/pages/Public/Testimonials';
import FeaturesPage from '@/pages/Public/Features';
import CompoundInterestCalculator from '@/pages/Public/CompoundInterest';
import PublicLayout from './layouts/PublicLayout';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './layouts/PrivateLayout';
import Dashboard from '@/pages/Private/Dashboard';
import Login from './pages/Public/Login';
import Register from './pages/Public/Register';
import { Transactions } from './pages/Private/Transactions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/testimonials' element={<TestimonialsPage />} />
          <Route path='/features' element={<FeaturesPage />} />
          <Route
            path='/compound-interest'
            element={<CompoundInterestCalculator />}
          />
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Transactions' element={<Transactions />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
