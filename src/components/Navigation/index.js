import className from "classnames/bind";
import styles from "./Navigation.module.scss";
import { UserInfor } from "../UserInfor";
import React, { useEffect, useState } from "react";
import { Notifications } from "../../features/getNotification";
import MenuSidebar from "./MenuSidebar";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchBar";
import userApi from "../../services/ManageUserApi";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

const cx = className.bind(styles);

export const Navigation = () => {
  const [profile, setProfile] = useState({});
  const [stateMenuSideBar, setStateMenuSideBar] = React.useState(true);

  useEffect(() => {
    userApi
      .getProfile()
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        console.log("ERROR axios profile >>> ", err);
      });
  }, []);
  const toggleDrawer = (event) => {
    setStateMenuSideBar(!stateMenuSideBar);
  };
  const handleClickMenuIcon = (anchor) => {
    toggleDrawer();
  };
  return (
    <div className={cx("navigate")}>
      <div className={cx("header")}>
        <Button size="large" onClick={handleClickMenuIcon}>
          <MenuIcon />
        </Button>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>

        <Notifications profile={profile} />

        <UserInfor profile={profile} />
      </div>
      <div>
        <MenuSidebar stateMenuSideBar={stateMenuSideBar} />
      </div>
    </div>
  );
};
