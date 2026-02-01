import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ProfileModal({ show, onHide, userId, onUpdated }) {
  const [form, setForm] = useState({ full_name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!show) return;
    setError('');
    axios.get(`/users/me`)
      .then((r) => setForm({ full_name: r.data.full_name, email: r.data.email }))
      .catch(() => setError('Profil konnte nicht geladen werden'));
  }, [show]);

  /* сохраняем изменения */
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.put('/users/me', form);
      onUpdated(form);
      onHide();
    } catch (err) {
      setError(err.response?.data?.msg || 'Fehler beim Speichern');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Mein Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Abbrechen</Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Speichern…' : 'Speichern'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
