import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import Home from './pages/Home';
import Login from './pages/Login';
// import PrivateRoute from './components/PrivateRoute;
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/About';
import TestimonialsPage from './pages/Testimonials';
import FeaturesPage from './pages/Features';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/testimonials' element={<TestimonialsPage />} />
        <Route path='/features' element={<FeaturesPage />} />

        {/* <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
        </Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;