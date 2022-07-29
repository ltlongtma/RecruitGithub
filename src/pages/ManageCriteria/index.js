import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import className from "classnames/bind";
import styles from "./criteria.module.scss";
import { GetCriteria } from "../../features/getCriteria";

const cx = className.bind(styles);

export const ManageCriteria = () => {
  return (
    <div>
      <div className={cx("criteria-breadcrumb")}>
        <Breadcrumb>
          <Breadcrumb.Item href="/question">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/question">Question bank</Breadcrumb.Item>
          <Breadcrumb.Item active>Manage Criteria </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <GetCriteria/>
      </div>
    </div>
  );
};
