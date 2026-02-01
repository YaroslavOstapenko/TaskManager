import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function Register() {
  const [f, setF] = useState({ email: '', password: '', full_name: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/register-admin', f);
      localStorage.setItem('token', data.token);
      window.location = '/';
    } catch (e) {
      alert(e.response?.data?.msg || 'Fehler');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="text-center mb-4">Administrator Registrierung</h3>

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Name"
            value={f.full_name}
            onChange={(e) => setF({ ...f, full_name: e.target.value })}
            required
          />
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
          <button className="btn btn-primary w-100">Registrieren</button>
        </form>

        <div className="text-center mt-3">
          <span>Bereits ein Konto? </span>
          <Link to="/login" className="text-decoration-none">
            Einloggen
          </Link>
        </div>
      </div>
    </div>
  );
}
