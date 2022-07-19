import className from "classnames/bind";
import styles from "./user.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { UserList } from "../../features/getUser";

const cx = className.bind(styles);

export const User = () => {
  return (
    <div>
      <div className={cx("user-list-breadcrumb")}>
        <Breadcrumb>
          <Breadcrumb.Item href="/user">Manage User</Breadcrumb.Item>
          <Breadcrumb.Item active>User list</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className={cx("table")}>
        <UserList />
      </div>
    </div>
  );
};
