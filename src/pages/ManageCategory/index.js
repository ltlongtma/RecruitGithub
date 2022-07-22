import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { CategoryQuestion } from "../../features/getCategoryQuestion";
import className from "classnames/bind";
import styles from "./category.module.scss";
import { PaginationQuestionBank } from "../../components/Pagination";

const cx = className.bind(styles);


export const ManageCategory = () => {
  return (
    <div>
      <div className={cx("user-list-breadcrumb")}>
        <Breadcrumb>
          <Breadcrumb.Item href="/question">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/question">Question bank</Breadcrumb.Item>
          <Breadcrumb.Item active>Manage Category </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <CategoryQuestion />
        <PaginationQuestionBank className={cx("pagination")} />

      </div>
    </div>
  );
};
