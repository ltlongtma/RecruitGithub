import * as React from "react";
import { Questionbank } from "../../features/getQuestionBank";
import className from "classnames/bind";
import styles from "./Home.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { PaginationQuestionBank } from "../../components/Pagination";
import PaginatedItems from "../../components/Paginate";

const cx = className.bind(styles);

export const Home = () => {
  return (
    <div>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumb>
          <Breadcrumb.Item href="/question">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Question bank</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={cx("table")}>
        {/* <Questionbank /> */}
        <PaginatedItems itemsPerPage={5}/>
      </div>
    </div>
  );
};
