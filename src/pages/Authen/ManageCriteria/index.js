import React from "react";
import { GetCriteria } from "../../../features/getCriteria";
import className from "classnames/bind";
import styles from "../Home/Home.module.scss";
import { Fab, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";
import AddIcon from "@mui/icons-material/Add";
import { CardInfo } from "../../../components/CardInfo";
import StoreIcon from "@mui/icons-material/Store";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import PendingIcon from "@mui/icons-material/Pending";

const cx = className.bind(styles);

export const ManageCriteria = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontFamily: "system-ui", flexGrow: 1, fontSize: "2em", paddingLeft: "1%" }}
        >
          Criteria
        </Typography>
        <Form>
          <Form.Control
            className={cx("form-group-input")}
            type="text"
            placeholder="Search..."
            name="keyword"
          />
        </Form>

        <Fab
          size="medium"
          color="info"
          aria-label="add"
          variant="extended"
          sx={{
            borderRadius: "7px",
            marginLeft: "1%",
            width: "6vw",
          }}
          // onClick={handleCreateQuestion}
          // hidden={hiddenCreateButton}
        >
          <AddIcon sx={{ mr: 1 }} />
          new
        </Fab>
      </div>
      <div className={cx("row", "CardInfo")}>
        <div className={cx("col-lg-4 col-sm-6", "card1")}>
          <CardInfo number="500" content="Total Criteria" />
          <StoreIcon />
        </div>
        <div className={cx("col-lg-4 col-sm-6", "card2")}>
          <CardInfo number="400" content="Actived" />
          <BeenhereIcon />
        </div>
        <div className={cx("col-lg-4 col-sm-6", "card3")}>
          <CardInfo number="100" content="Inactived" />
          <PendingIcon />
        </div>
      </div>
      <div className={cx("table")}>
        <GetCriteria />
      </div>
    </div>
  );
};
