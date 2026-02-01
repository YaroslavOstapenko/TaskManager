import { Modal, Button } from 'react-bootstrap';
import axios from '../api/axios';
import { useEffect, useState } from 'react';

export default function CreateTaskModal({
  show,
  onHide,
  form,
  setForm,
  onSubmit,
  loading,
  userId,
  userRole
}) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!show) return;

    axios.get('/users/employees').then(r => {
      console.log('MITARBEITER:', r.data);
      setEmployees(r.data);
    });

  }, [show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Neue Aufgabe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="row g-3">
          <div className="col-12">
            <input
              className="form-control"
              placeholder="Titel"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              placeholder="Beschreibung"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={form.employee_id}
              onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
              required
            >
              <option value="">Mitarbeiter auswählen</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>{e.full_name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Abbrechen</Button>
        <Button variant="primary" onClick={onSubmit} disabled={loading}>
          {loading ? 'Erstellen…' : 'Erstellen'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
