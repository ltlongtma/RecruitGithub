import React from "react";
import className from "classnames/bind";
import styles from "./ViewDetailQuestion.module.scss";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DetailQuestion } from "../../../features/getDetailQuestion";

const cx = className.bind(styles);

export const ViewDetailQuestion = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/question">
      Question Bank
    </Link>,
    <Typography key="2">Detail Question</Typography>,
  ];
  return (
    <div>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div>
        <DetailQuestion />
      </div>
    </div>
  );
};
