import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.tsx';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute element= {<Home />} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
