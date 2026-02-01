import { useEffect, useState } from 'react';
import axios from '../api/axios';
import useCompany from '../hooks/useCompany';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddUserModal from '../components/AddUserModal';
import DeleteUserModal from '../components/DeleteUserModal';

export default function Users() {
  const navigate = useNavigate();
  const { hasCompany } = useCompany();
  const [users, setUsers] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [delUserId, setDelUserId] = useState(null);

  const [form, setForm] = useState({ email: '', full_name: '', role: 'employee' });
  const [loading, setLoading] = useState(false);
  const currentUserId = Number(localStorage.getItem('userId'));

  const fetchUsers = async () => {
    const { data } = await axios.get('/users');
    setUsers(data);
  };
  useEffect(() => { if (hasCompany) fetchUsers(); }, [hasCompany]);

  const approve = async (id) => {
    await axios.patch(`/users/approve/${id}`);
    fetchUsers();
  };

  const changeRole = async (id, role) => {
    await axios.patch(`/users/role/${id}`, { role });
    fetchUsers();
  };

  /* создание пользователя */
  const addUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/users/add', form);
      setUsers(prev => [...prev, data]);
      setForm({ email: '', full_name: '', role: 'employee' });
      alert(`Benutzer ${data.email} erstellt. Passwort wurde per E-Mail gesendet (Platzhalter)`);
    } catch (e) {
      alert(e.response?.data?.msg || 'Fehler');
    } finally {
      setLoading(false);
      setShowAddModal(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/users/${delUserId}`);
      setUsers(prev => prev.filter(u => u.id !== delUserId));
    } catch (e) {
      alert(e.response?.data?.msg || 'Löschen fehlgeschlagen');
    } finally {
      setShowDelModal(false);
      setDelUserId(null);
    }
  };

  if (!hasCompany)
    return (
      <div>
        <div className="alert alert-warning d-flex align-items-center gap-3">
          <span>Bitte erstellen Sie zuerst ein Unternehmen.</span>
          <button className="btn btn-sm" onClick={() => navigate('/company')}>Zu „Unternehmen“</button>
        </div>
      </div>
    );

  return (
    <div>
      {!showAddModal && (
        <Button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>
          Benutzer hinzufügen
        </Button>
      )}

      <AddUserModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        form={form}
        setForm={setForm}
        onSubmit={addUser}
        loading={loading}
      />

      <DeleteUserModal
        show={showDelModal}
        onHide={() => setShowDelModal(false)}
        onConfirm={confirmDelete}
      />

      {users.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Rolle</th>
              <th>Bestätigt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.full_name}</td>
                <td>{u.role}</td>
                <td>{u.approved ? 'Ja' : 'Nein'}</td>
                <td>
                  {!u.approved && (
                    <button className="btn btn-sm btn-success me-2" onClick={() => approve(u.id)}>
                      Genehmigen
                    </button>
                  )}
                  <select className="form-select form-select-sm d-inline-block w-auto" value={u.role} onChange={(e) => changeRole(u.id, e.target.value)}>
                    <option value="admin">admin</option>
                    <option value="manager">manager</option>
                    <option value="employee">employee</option>
                  </select>
                  {u.id !== currentUserId && (
                    <button className="btn btn-sm btn-danger ms-2" onClick={() => { setDelUserId(u.id); setShowDelModal(true); }}>
                      Löschen
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning">Liste ist leer</div>
      )}
    </div>
  );
}
