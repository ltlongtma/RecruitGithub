import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../templates.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

export const ModalCloneTemplate = ({ closeModal, handleClone, ...props }) => {
  return (
    <div>
      <Modal {...props} className={cx("modal")}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>Clone Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure want to clone this template ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClone}>
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
