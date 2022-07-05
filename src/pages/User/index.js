import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import className from "classnames/bind";
import styles from "./user.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { UserList } from "../../features/getUser/UserList";

const cx = className.bind(styles);

export const User = () => {
  return (
    <div>
      <div className={cx("user-list-header")}>
        <Breadcrumb>
          <Breadcrumb.Item href="/user">Manage User</Breadcrumb.Item>
          <Breadcrumb.Item active>User list</Breadcrumb.Item>
        </Breadcrumb>
        <Button variant="primary" size="sm">
          <AddIcon /> Add new user
        </Button>
      </div>
      <div>
        <Form className={cx("form")}>
          <Form.Group className={cx("form-group")} controlId="exampleForm.ControlInput1">
            <Form.Control className={cx("form-group-input")} type="text" placeholder="user name" />
            <Form.Control className={cx("form-group-input")} type="email" placeholder="email" />
          </Form.Group>
          <Button variant="outline-primary" size="sm">
            <SearchIcon />
          </Button>
        </Form>
      </div>
      <UserList />
    </div>
  );
};
