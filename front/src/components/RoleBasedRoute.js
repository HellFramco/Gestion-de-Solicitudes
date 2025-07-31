import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const RoleBasedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  return user?.role === role ? children : <div>No tienes acceso.</div>;
};
