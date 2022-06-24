import styles from "./Header.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

export const Header = ({ children }) => {
  return (
    <header className={cx("container-fluid", "wrapper")}>
      <div className={cx("inner")}>{children}</div>
    </header>
  );
};
