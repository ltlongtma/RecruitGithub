import * as React from "react";
import { Questionbank } from "../../features/getQuestionBank";
import className from "classnames/bind";
import styles from "./Home.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import AddIcon from "@mui/icons-material/Add";
import Button from "react-bootstrap/Button";

import { PaginationQuestionBank } from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

const cx = className.bind(styles);

export const Home = () => {
  const navigate = useNavigate();
  const handleCreateQuestion = () => {
    navigate("/question/create");
  };
  return (
    <div>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumb>
          <Breadcrumb.Item href="/question">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Question bank</Breadcrumb.Item>
        </Breadcrumb>
        <Button variant="success" size="sm" onClick={handleCreateQuestion}>
          <AddIcon /> Create New Question
        </Button>
      </div>
      <div className={cx("table")}>
        <Questionbank />
        <PaginationQuestionBank className={cx("pagination")} />
      </div>
    </div>
  );
};
