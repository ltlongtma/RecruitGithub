import className from "classnames/bind";
import styles from "./user.module.scss";
import { UserList } from "../../features/getUser";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const cx = className.bind(styles);

export const User = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/question">
      Home
    </Link>,
    <Typography key="2">Manage Users</Typography>,
  ];
  return (
    <div>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>

      <div className={cx("table")}>
        <UserList />
      </div>
    </div>
  );
};
