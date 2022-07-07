import * as React from "react";
import { Questionbank } from "../../features/getQuestionBank/QuestionBank";
import className from "classnames/bind";
import styles from "./Home.module.scss";

const cx = className.bind(styles);

export const Home = () => {
  return (
    <div className={cx("table")}>
      <Questionbank />
    </div>
  );
};
