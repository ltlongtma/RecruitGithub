import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from "@mui/icons-material/Category";
import StairsIcon from "@mui/icons-material/Stairs";
import MessageIcon from "@mui/icons-material/Message";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BallotIcon from "@mui/icons-material/Ballot";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import className from "classnames/bind";
import styles from "./Navigation.module.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
const cx = className.bind(styles);

const ListSidebar = ({ anchor }) => {
  const [collapseQuestionBank, setCollapseQuestionBank] = React.useState(false);
  const [collapseInterview, setCollapseInterview] = React.useState(false);
  const navigate = useNavigate();

  const handleClickQuestionBank = () => {
    setCollapseQuestionBank(!collapseQuestionBank);
  };
  const handleClickInterview = () => {
    setCollapseInterview(!collapseInterview);
  };
  return (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      className={cx("sideBar")}
    >
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
};
export default ListSidebar;
