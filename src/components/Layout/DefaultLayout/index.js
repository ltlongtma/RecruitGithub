import styles from "./DefaultLayout.module.scss";
import className from "classnames/bind";
import React from "react";
import Navigate from "../../Navigation";
const cx = className.bind(styles);

export const DefaultLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Navigate>{children}</Navigate>
    </div>
  );
};
