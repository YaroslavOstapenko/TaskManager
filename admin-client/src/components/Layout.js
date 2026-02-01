import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ProfileModal from '../components/ProfileModal';
import axios from '../api/axios';

export default function Layout() {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [userRole, setUserRole] = useState('employee');
  const currentUserId = Number(localStorage.getItem('userId'));

  const [pageTitle, setPageTitle] = useState('Dashboard');

  useEffect(() => {
    const titles = {
      '/company': 'Mein Unternehmen',
      '/users': 'Benutzer',
      '/tasks': 'Aufgaben',
      '/': 'Dashboard'
    };
    setPageTitle(titles[location.pathname] || 'Dashboard');

    axios.get('/users/me').then(r => {
      setUserRole(r.data.role);
    }).catch(err => {
      console.error('Fehler beim Abrufen der Benutzerrolle:', err);
    });
  }, [location.pathname]);

  const handleProfileUpdate = (newData) => {
    console.log('Profil aktualisiert:', newData);
  };

  const logout = () => {
    localStorage.clear();
    window.location = '/login';
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <nav className="d-flex flex-column p-3 bg-light shadow-sm" style={{ width: 220, flexShrink: 0 }}>
        <div className="mb-4 fw-bold text-center">Admin</div>

        <div className="d-flex flex-column gap-2 flex-grow-1">
          {userRole === 'admin' && (
            <NavLink to="/company" className={({ isActive }) => (isActive ? 'btn btn-primary rounded' : 'btn btn-ghost rounded')}>Unternehmen</NavLink>
          )}
          {(userRole === 'admin' || userRole === 'manager') && (
            <>
              <NavLink to="/users" className={({ isActive }) => (isActive ? 'btn btn-primary rounded' : 'btn btn-ghost rounded')}>Benutzer</NavLink>
              <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'btn btn-primary rounded' : 'btn btn-ghost rounded')}>Aufgaben</NavLink>
            </>
          )}
          {(userRole === 'employee') && (
            <>
              <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'btn btn-primary rounded' : 'btn btn-ghost rounded')}>Aufgaben</NavLink>
            </>
          )}
        </div>

        <button className="btn btn-secondary mt-auto" onClick={logout}>Abmelden</button>
      </nav>

      <main className="flex-grow-1 p-4 bg-white overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">{pageTitle}</h4>
          <Button size="sm" onClick={() => setShowProfile(true)}>Profil</Button>
        </div>

        <ProfileModal
          show={showProfile}
          onHide={() => setShowProfile(false)}
          userId={currentUserId}
          onUpdated={handleProfileUpdate}
        />

        <Outlet />
      </main>
    </div>
  );
}
