import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./Modal.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

export const ModalApproveQuestion = ({ closeModal, onApprove, ...props }) => {
  return (
    <div>
      <Modal {...props} className={cx("modal")}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>Delete Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure want to approve this question?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onApprove}>
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
