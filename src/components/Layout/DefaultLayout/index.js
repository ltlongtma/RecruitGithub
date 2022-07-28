import styles from "./DefaultLayout.module.scss";
import className from "classnames/bind";
import { Header } from "../Common/Header";
import { Navigation } from "../../Navigation";
const cx = className.bind(styles);

export const DefaultLayout = ({ children }) => {
  
  return (
    <div className={cx("wrapper")}>
      <div>
        <Header>
          <Navigation />
        </Header>
      </div>

      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
};
