import React from "react";
import className from "classnames/bind";
import styles from "./criteria.module.scss";
import { GetCriteria } from "../../features/getCriteria";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const cx = className.bind(styles);

export const ManageCriteria = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/question">
      Question Bank
    </Link>,
    <Typography key="2">Manage Criteria</Typography>,
  ];
  return (
    <div>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div>
        <GetCriteria />
      </div>
    </div>
  );
};
