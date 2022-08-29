import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../templates.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

export const ModalSharingTemplate = ({ closeModal, handleSharing, ...props }) => {
  return (
    <div>
      <Modal {...props} className={cx("modal")}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>Sharing Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure want to sharing this template for public?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSharing}>
            Yes
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
