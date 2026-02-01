import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Login() {
  const [f, setF] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', f);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      navigate('/');
    } catch (e) {
      alert(e.response?.data?.msg || 'Fehler');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="text-center mb-4">Anmeldung</h3>

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Email"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Passwort"
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
            required
          />
          <button className="btn btn-primary w-100">Einloggen</button>
        </form>

        <div className="text-center mt-3">
          <span>Kein Konto? </span>
          <Link to="/register" className="text-decoration-none">
            Registrieren
          </Link>
        </div>
      </div>
    </div>
  );
}
