import className from "classnames/bind";
import styles from "./Navigation.module.scss";
import { UserInfor } from "../UserInfor";
import React, { useEffect, useState } from "react";
import { Notifications } from "../../features/getNotification";
import MenuSidebar from "./MenuSidebar";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchBar";
import userApi from "../../services/ManageUserApi";
const cx = className.bind(styles);

export const Navigation = () => {
  const [profile, setProfile] = useState({});

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

  return (
    <div className={cx("navbar")}>
      <div>
        <MenuSidebar />
      </div>
      <div className={cx("nacbarRight")}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>

        <Notifications profile={profile} />

        <UserInfor profile={profile} />
      </div>
    </div>
  );
};
