import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import className from "classnames/bind";
import styles from "./Navigation.module.scss";
import { useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from "@mui/icons-material/Category";
import StairsIcon from "@mui/icons-material/Stairs";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MessageIcon from "@mui/icons-material/Message";
import BallotIcon from "@mui/icons-material/Ballot";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Navbar } from "react-bootstrap";
import logo from "../../assets/logo-tma.png";

const cx = className.bind(styles);

const MenuSidebar = ({ stateMenuSideBar }) => {
  // const [stateMenuSideBar, setStateMenuSideBar] = React.useState(true);
  const [collapseQuestionBank, setCollapseQuestionBank] = React.useState(false);
  const [collapseInterview, setCollapseInterview] = React.useState(false);

  const navigate = useNavigate();
  const handleClickQuestionBank = () => {
    setCollapseQuestionBank(!collapseQuestionBank);
  };
  const handleClickInterview = () => {
    setCollapseInterview(!collapseInterview);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      className={cx("sideBar")}
      //   onClick={toggleDrawer}
      //   onKeyDown={toggleDrawer}
    >
      <div className={cx("brand")}>
        <Navbar.Brand href="/">
          <img alt="tma-logo" src={logo} width="80" height="auto" className={cx("logo")} />
          <span className={cx("textBrand")}>Recruitment Tool</span>
        </Navbar.Brand>
      </div>
      <Divider />

      <div>
        <List>
          <ListItemButton onClick={handleClickQuestionBank}>
            <ListItemIcon>
              <HelpCenterIcon color="primary" />
            </ListItemIcon>

            <ListItemText className={cx("sideBarHeader")} primary="Question Bank" />
            {collapseQuestionBank ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={collapseQuestionBank} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              onClick={() => {
                navigate("/question");
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="View All" />
              </ListItemButton>
            </List>
            <List
              component="div"
              disablePadding
              onClick={() => {
                navigate("/question-category");
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Category" />
              </ListItemButton>
            </List>
            <List
              component="div"
              disablePadding
              onClick={() => {
                navigate("/question-criteria");
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StairsIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Criteria" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div>
      <div>
        <List>
          <ListItemButton onClick={handleClickInterview}>
            <ListItemIcon>
              <MessageIcon color="warning" />
            </ListItemIcon>
            <ListItemText className={cx("sideBarHeader")} primary="Interview" />
            {collapseInterview ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={collapseInterview} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              onClick={() => {
                navigate("/interview");
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarHalfIcon />
                </ListItemIcon>
                <ListItemText primary="Interview" />
              </ListItemButton>
            </List>
            <List
              component="div"
              disablePadding
              onClick={() => {
                navigate("/interview/templates");
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="Templates" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div>
      <div>
        <List
          onClick={() => {
            navigate("/user");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltIcon color="success" />
            </ListItemIcon>
            <ListItemText className={cx("sideBarHeader")} primary="Manage User"></ListItemText>
          </ListItemButton>
        </List>
      </div>
    </Box>
  );

  return (
    <aside>
      <Drawer
        anchor="left"
        // onClose={toggleDrawer}
        open={stateMenuSideBar}
        sx={{
          position: "absolute",
          zIndex: 0,
          // width: "13vw",
          "& .MuiBackdrop-root": {
            background: "rgba(0, 0, 0, 0)",
            // width: "13vw",
          },
          "& .MuiDrawer-paper": {
            background: "white",
          },
        }}
      >
        {list()}
      </Drawer>
    </aside>
  );
};
export default MenuSidebar;
