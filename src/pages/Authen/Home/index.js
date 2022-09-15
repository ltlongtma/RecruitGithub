import * as React from "react";
import { Questionbank } from "../../../features/getQuestionBank";
import className from "classnames/bind";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const cx = className.bind(styles);

export const Home = () => {
  const navigate = useNavigate();
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/question">
      Question Bank
    </Link>,
    <Typography key="2">View All</Typography>,
  ];
  return (
    <div>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
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
