import * as React from "react";
import { Questionbank } from "../../../features/getQuestionBank";
import className from "classnames/bind";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { Fab, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";
import AddIcon from "@mui/icons-material/Add";
import { CardInfo } from "../../../components/CardInfo";
import StoreIcon from "@mui/icons-material/Store";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import PendingIcon from "@mui/icons-material/Pending";
const cx = className.bind(styles);

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontFamily: "system-ui", flexGrow: 1, fontSize: "2em", paddingLeft: "1%" }}
        >
          Question Bank
        </Typography>
        <Form>
          <Form.Control
            className={cx("form-group-input")}
            type="text"
            placeholder="Search..."
            name="keyword"
            // onChange={handleChangeSelectValue}
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
          <CardInfo number="500" content="Total Questions" />
          <StoreIcon />
        </div>
        <div className={cx("col-lg-4 col-sm-6", "card2")}>
          <CardInfo number="400" content="Approved" />
          <BeenhereIcon />
        </div>
        <div className={cx("col-lg-4 col-sm-6", "card3")}>
          <CardInfo number="100" content="Pending" />
          <PendingIcon />
        </div>
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
