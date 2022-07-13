import Button from "react-bootstrap/Button";
import className from "classnames/bind";
import styles from "./user.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import AddIcon from "@mui/icons-material/Add";
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
