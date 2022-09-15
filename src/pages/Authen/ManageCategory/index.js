import React from "react";
import { CategoryQuestion } from "../../../features/getCategoryQuestion";
import className from "classnames/bind";
import styles from "./category.module.scss";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const cx = className.bind(styles);

export const ManageCategory = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/question">
      Question Bank
    </Link>,
    <Typography key="2">Manage Category</Typography>,
  ];
  return (
    <div>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div>
        <CategoryQuestion />
      </div>
    </div>
  );
};
