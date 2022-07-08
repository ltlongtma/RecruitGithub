import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../Modal/Modal.module.scss";
import className from "classnames/bind";
const cx = className.bind(styles);

export const ModalEditRole = ({
  user,
  handleChangeRole,
  handleEditNewRole,
  handleCloseModalEdit,
  ...props
}) => {
  return (
    <Modal {...props} className={cx("modal")}>
      <Modal.Header closeButton>
        <Modal.Title className={cx("modal-title")}>Edit Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>
          Edit account {user?.username} with role {user?.roles[0].name}?
        </h6>
        <Form>
          <Form.Text>New Role</Form.Text>
          <Form.Check
            type="radio"
            label="ADMIN"
            id="admin"
            name="role"
            value="ADMIN"
            onChange={handleChangeRole}
            defaultChecked={user?.roles[0].name === "ADMIN" ? true : false}
          />
          <Form.Check
            type="radio"
            label="USER"
            id="user"
            name="role"
            value="USER"
            onChange={handleChangeRole}
            defaultChecked={user?.roles[0].name === "USER" ? true : false}
          />
          <Form.Check
            type="radio"
            label="GUEST"
            id="guest"
            name="role"
            value="GUEST"
            onChange={handleChangeRole}
            defaultChecked={user?.roles[0].name === "GUEST" ? true : false}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => handleEditNewRole(user?.id)}>
          Save
        </Button>
        <Button variant="secondary" onClick={handleCloseModalEdit}>
          Cancer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
