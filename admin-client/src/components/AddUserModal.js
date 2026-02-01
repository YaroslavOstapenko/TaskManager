import { Modal, Button } from 'react-bootstrap';

export default function AddUserModal({ show, onHide, form, setForm, onSubmit, loading }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Neuer Benutzer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="row g-3">
          <div className="col-12">
            <input
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <input
              className="form-control"
              placeholder="Name"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <select
              className="form-select"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="employee">Mitarbeiter</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Abbrechen</Button>
        <Button variant="primary" onClick={onSubmit} disabled={loading}>
          {loading ? 'Fügen wir hinzu…' : 'Hinzufügen'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
