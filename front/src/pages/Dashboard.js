import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Bienvenido, {user.username}</h2>
      <p>Rol: {user.role}</p>
      <nav>
        <Link to="/crud">Ir a CRUD</Link> | <button onClick={logout}>Cerrar sesión</button>
      </nav>
    </div>
  );
};

export default Dashboard;
