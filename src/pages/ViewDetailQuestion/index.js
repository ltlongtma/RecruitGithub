import React from "react";
import { useSelector } from "react-redux";
import className from "classnames/bind";
import styles from "./ViewDetailQuestion.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const cx = className.bind(styles);

export const ViewDetailQuestion = () => {
  const DetailQuestion = useSelector((state) => state.getDetailQuestion);
  console.log("DetailQuestion >>>", DetailQuestion);

  return (
    <div>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumb>
          <Breadcrumb.Item href="/question">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/question">Question bank</Breadcrumb.Item>
          <Breadcrumb.Item active>Detail Question </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
};
