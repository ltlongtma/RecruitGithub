import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./Modal.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

export const ModalDeleteCriteria = ({ handleClose, onDelete, ...props }) => {
  return (
    <div>
      <Modal {...props} className={cx("modal")} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>Delete Criteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure want to delete this criteria?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
