import className from "classnames/bind";
import styles from "./Navigation.module.scss";
import logo from "../../assets/logo-tma.png";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserDetail } from "../UserDetail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
const cx = className.bind(styles);

export const Navigation = () => {
  const role = sessionStorage.getItem("isRole");
  return (
    <Navbar className={cx("navbar")}>
      <Navbar.Brand href="#home" className={cx("brand")}>
        <img
          alt="tma-logo"
          src={logo}
          width="100"
          height="auto"
          className="d-inline-block align-top"
        />
        <span className={cx("text-brand")}>Recruitment Tool</span>
      </Navbar.Brand>

      <Nav className={cx("action")}>
        <NavDropdown title="Question Bank" className={cx("action-dropdown")}>
          <NavDropdown.Item href="/question">
            {/* <NavLink to="/question">View All</NavLink> */}
            View All
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/question-category">
            {/* <NavLink to="/question-category">Manage Category</NavLink> */}Manage Category
          </NavDropdown.Item>
          <NavDropdown.Item href="/question-criteria">
            {/* <NavLink to="/question-criteria">Manage Criteria</NavLink> */} Manage Criteria
          </NavDropdown.Item>
        </NavDropdown>
        <NavLink to="/interview">Interview</NavLink>
        {role === "ADMIN" && <NavLink to="/user">Manage User</NavLink>}

        <Form className={cx("search", "d-flex")}>
          <Form.Control type="search" placeholder="Search" aria-label="Search" size="sm" />
          <Button size="sm" variant="success">
            Search
          </Button>
        </Form>
        <Badge badgeContent={4} color="error">
          <NotificationsIcon />
        </Badge>

        <UserDetail />
      </Nav>
    </Navbar>
  );
};
