import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import className from "classnames/bind";
import styles from "./user.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { UserList } from "../../features/getUser";
import { ModalAddNewUser } from "../../features/getUser/Modal/ModalAddNewUser.js";
import { useState } from "react";

const cx = className.bind(styles);

export const User = () => {
  const [showModalAddNewUser, toggleModalAddNewUser] = useState(false);
  return (
    <div>
      <div className={cx("user-list-breadcrumb")}>
        <Breadcrumb>
          <Breadcrumb.Item href="/user">Manage User</Breadcrumb.Item>
          <Breadcrumb.Item active>User list</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          variant="success"
          size="sm"
          onClick={() => toggleModalAddNewUser(!showModalAddNewUser)}
        >
          <AddIcon /> Add new user
        </Button>
      </div>

      <div>
        <Form className={cx("form")}>
          <Form.Group className={cx("form-group")} controlId="exampleForm.ControlInput1">
            <Form.Control className={cx("form-group-input")} type="text" placeholder="User name" />
            <Form.Control className={cx("form-group-input")} type="email" placeholder="Email" />

            <Form.Select className={cx("form-group-input")}>
              <option value="1">Admin</option>
              <option value="2">User</option>
              <option value="3">Guest</option>
            </Form.Select>
          </Form.Group>
          <Button variant="outline-success" size="sm">
            <SearchIcon />
          </Button>
        </Form>
      </div>
      <div className={cx("table")}>
        <UserList />
        <ModalAddNewUser
          show={showModalAddNewUser}
          onHide={() => toggleModalAddNewUser(!showModalAddNewUser)}
          closeModal={() => toggleModalAddNewUser(!showModalAddNewUser)}
        />
      </div>
    </div>
  );
};
