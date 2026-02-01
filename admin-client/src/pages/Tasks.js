import { useEffect, useState } from 'react';
import axios from '../api/axios';
import useCompany from '../hooks/useCompany';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CreateTaskModal from '../components/CreateTaskModal';

export default function Tasks() {
  const navigate = useNavigate();
  const { hasCompany } = useCompany();
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    employee_id: '',
    due_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('employee');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!hasCompany) return;
    axios.get('/tasks').then(r => setList(r.data));
    axios.get('/users/me').then(r => {
      setUserRole(r.data.role);
      setUserId(r.data.id);
    });
  }, [hasCompany]);

  const createTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/tasks', form);
      setForm({ title: '', description: '', employee_id: '', due_date: '' });
      setShowModal(false);
      const { data } = await axios.get('/tasks');
      setList(data);
    } catch (err) {
      alert(err.response?.data?.msg || 'Fehler beim Erstellen der Aufgabe');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Aufgabe löschen?')) return;
    await axios.delete(`/tasks/${id}`);
    setList(prev => prev.filter(t => t.id !== id));
  };

  const updateStatus = async (taskId, status) => {
    try {
      await axios.patch(`/tasks/${taskId}/status`, { status });
      setList(list.map(task => task.id === taskId ? { ...task, status } : task));
    } catch (err) {
      alert(err.response?.data?.msg || 'Fehler beim Aktualisieren des Status');
    }
  };

  if (!hasCompany)
    return (
      <div>
        <div className="alert alert-warning d-flex align-items-center gap-3">
          <span>Bitte erstellen Sie zuerst ein Unternehmen.</span>
          <button className="btn btn-sm" onClick={() => navigate('/company')}>
            Zu „Unternehmen“
          </button>
        </div>
      </div>
    );

  return (
    <div>
      {userRole === 'manager' || userRole === 'admin' ? (
        <>
          <Button
            className="btn btn-primary mb-3"
            onClick={() => setShowModal(true)}
          >
            Aufgabe erstellen
          </Button>
          <CreateTaskModal
            show={showModal}
            onHide={() => setShowModal(false)}
            form={form}
            setForm={setForm}
            onSubmit={createTask}
            loading={loading}
            userId={userId}
            userRole={userRole}
          />
        </>
      ) : null}

      {list.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titel</th>
              <th>Beschreibung</th>
              <th>Ausführender</th>
              <th>Status</th>
              <th>Dateien</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.employee?.full_name || '-'}</td>
                <td>{task.status}</td>
                <td><Files taskId={task.id} /></td>
                <td>
                  {userRole === 'manager' || userRole === 'admin' ? (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      Löschen
                    </button>
                  ) : (
                    <div>
                      {task.employee_id === userId && (
                        <div>
                          <Button
                            variant="success"
                            onClick={() => updateStatus(task.id, 'in_progress')}
                            disabled={task.status !== 'pending'}
                          >
                            In Arbeit nehmen
                          </Button>
                          <Button
                            variant="success"
                            onClick={() => updateStatus(task.id, 'done')}
                            disabled={task.status !== 'in_progress'}
                          >
                            Abschließen
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning">Keine Aufgaben vorhanden</div>
      )}
    </div>
  );
}

function Files({ taskId }) {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    axios.get(`/tasks/${taskId}/files`).then((r) => setFiles(r.data));
  }, [taskId]);
  return files.length ? (
    files.map((f) => (
      <div key={f.id}>
        <a href={`http://localhost:5000/${f.path}`} target="_blank" rel="noreferrer">
          {f.filename}
        </a>
      </div>
    ))
  ) : (
    '-'
  );
}
