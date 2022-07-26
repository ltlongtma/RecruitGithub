import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./Modal.module.scss"
import className from "classnames/bind";

const cx = className.bind(styles);

export const ModalRejectQuestion = ({ closeModal, onReject, ...props }) => {
  return (
    <div>
      <Modal {...props} className={cx("modal")}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>Delete Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure want to reject this question?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={onReject}>
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
