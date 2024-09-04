import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('access_token');

    if (token) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
