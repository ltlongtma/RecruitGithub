import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import className from "classnames/bind";
import styles from "../Breadcrumb/module.scss";

const cx = className.bind(styles);

export const Breadcrumb = ({ firstTitle, secondTitle, href }) => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href={href}>
      {firstTitle}
    </Link>,
    <Typography key="2">{secondTitle}</Typography>,
  ];
  return (
    <div className={cx("breadcrumb")}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};
