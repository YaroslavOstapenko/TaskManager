import { Modal, Button } from 'react-bootstrap';

export default function DeleteUserModal({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Löschbestätigung</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Sind Sie sicher, dass Sie diesen Benutzer löschen möchten? Diese Aktion ist unwiderruflich.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Abbrechen</Button>
        <Button variant="danger" onClick={onConfirm}>Löschen</Button>
      </Modal.Footer>
    </Modal>
  );
}
