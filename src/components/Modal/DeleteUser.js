import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ModalDeleteUser = ({ props }) => {
  return (
    <div>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClick}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
