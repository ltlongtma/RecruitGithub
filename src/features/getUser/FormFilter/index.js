import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import SearchIcon from "@mui/icons-material/Search";
import className from "classnames/bind";
import styles from "./FormFilter.module.scss";
import Button from "react-bootstrap/Button";

const cx = className.bind(styles);

export default function FormFilterUser({ onFilterAll }) {
  const [paramFilter, setParamFilter] = useState({
    page: 1,
    pageSize: 5,
    name: "",
    username: "",
    email: "",
    roleId: "",
  });
  const handleFilterRole = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newParamFilter = { ...paramFilter, [name]: value };
    setParamFilter({ ...newParamFilter, [name]: value });
    onFilterAll(newParamFilter);
  };
  return (
    <div>
      <Form className={cx("form")}>
        <Form.Group className={cx("form-group")} controlId="exampleForm.ControlInput1">
          <Form.Control
            className={cx("form-group-input")}
            type="text"
            placeholder="User name"
            name="username"
            onChange={handleFilterRole}
          />
          <Form.Control
            className={cx("form-group-input")}
            type="text"
            placeholder="Name"
            onChange={handleFilterRole}
            name="name"
          />
          <Form.Control
            className={cx("form-group-input")}
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleFilterRole}
          />
          <Form.Select className={cx("form-group-input")} onChange={handleFilterRole} name="roleId">
            <option value="">Role - All</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
            <option value="3">Guest</option>
          </Form.Select>
        </Form.Group>
        <Button variant="outline-success" size="sm">
          <SearchIcon />
        </Button>
      </Form>
    </div>
  );
}
