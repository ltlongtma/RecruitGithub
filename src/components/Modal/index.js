import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

export const ModalConfirm = ({ handleNoModal, handleYesModal, title, content, ...props }) => {
  return (
    <div>
      <Modal {...props} className={cx("modal")}>
        <Modal.Header closeButton className={cx("header")}>
          <Modal.Title className={cx("modalTitle")}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx("modalBody")}>
          <h5>{content}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleYesModal}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleNoModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
