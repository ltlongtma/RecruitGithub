import className from "classnames/bind";
import { UserList } from "../../../features/getUser";
import React from "react";
import styles from "../Home/Home.module.scss";
import { Fab, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";
import AddIcon from "@mui/icons-material/Add";
import { CardInfo } from "../../../components/CardInfo";
import PeopleSharpIcon from "@mui/icons-material/PeopleSharp";

const cx = className.bind(styles);

export const User = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontFamily: "system-ui", flexGrow: 1, fontSize: "2em", paddingLeft: "1%" }}
        >
          User
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
          <CardInfo number="500" content="Total Users" />
          <PeopleSharpIcon />
        </div>
      </div>
      <div className={cx("table")}>
        <UserList />
      </div>
    </div>
  );
};
