import * as React from "react";
import { Questionbank } from "../../../features/getQuestionBank";
import className from "classnames/bind";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../../components/Breadcrumb";
const cx = className.bind(styles);

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Breadcrumb firstTitle={"Question Bank"} secondTitle={"View All"} href={"/question"} />
      <div className={cx("table")}>
        <Questionbank
          navigateWithState={(e) => {
            navigate(`/question/${e}`);
          }}
        />
      </div>
    </div>
  );
};
