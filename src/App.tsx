import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import LandingPage from '@/pages/LandingPage';
import AboutPage from '@/pages/About';
import TestimonialsPage from '@/pages/Testimonials';
import FeaturesPage from '@/pages/Features';
import Home from '@/pages/Home';
import CompoundInterestCalculator from '@/pages/CompoundInterest';
import PublicLayout from './layouts/PublicLayout';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './layouts/PrivateLayout';

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
            <Route path='/home' element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
