import className from "classnames/bind";
import styles from "./user.module.scss";
import { UserList } from "../../../features/getUser";
import { Breadcrumb } from "../../../components/Breadcrumb";

const cx = className.bind(styles);

export const User = () => {
  return (
    <div>
      <Breadcrumb firstTitle={"Home"} secondTitle={"Manage User"} href={"/question"} />
      <div className={cx("table")}>
        <UserList />
      </div>
    </div>
  );
};
