import className from "classnames/bind";
import styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";

const cx = className.bind(styles);

export const Navigation = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("menu")}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/user">User</NavLink>
      </div>
      <div className={cx("action")}>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </div>
  );
};
