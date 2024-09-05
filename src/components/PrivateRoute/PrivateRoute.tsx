import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  console.log("Token en PrivateRoute:", token); // Verifica si el token está presente

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
