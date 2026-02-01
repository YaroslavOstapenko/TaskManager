import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';

export default function Private({ children }) {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios.get('/users/me')
      .then(response => {
        setUserRole(response.data.role);
      })
      .catch(err => {
        console.error('Fehler beim Abrufen der Benutzerrolle:', err);
      });
  }, []);

  if (userRole === null) {
    return <div>Lädt…</div>;
  }

  let allowedPaths;
  switch (userRole) {
    case 'admin':
      allowedPaths = ['/company', '/users', '/tasks'];
      break;
    case 'manager':
      allowedPaths = ['/users', '/tasks'];
      break;
    case 'employee':
      allowedPaths = ['/tasks'];
      break;
    default:
      allowedPaths = ['/login'];
  }

  if (!allowedPaths.includes(location.pathname)) {
    return <Navigate to={allowedPaths[0]} replace />;
  }

  return children;
}
