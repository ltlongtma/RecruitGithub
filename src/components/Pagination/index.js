import Pagination from "react-bootstrap/Pagination";
import React from "react";
import className from "classnames/bind";

import styles from "./pagination.module.scss";

const cx = className.bind(styles);

export const PaginationQuestionBank = () => {
  return (
    <div className={cx("pagination")}>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1} </Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>

        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>

        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
};
