import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import SearchIcon from "@mui/icons-material/Search";
import className from "classnames/bind";
import styles from "./FormFilter.module.scss";
// import Button from "react-bootstrap/Button";
import AddIcon from "@mui/icons-material/Add";
import { ModalAddNewUser } from "../Modal/ModalAddNewUser";
import { Button } from "@mui/material";

const cx = className.bind(styles);

export default function FormFilterUser({ onFilterAll, params }) {
  const [showModalAddNewUser, toggleModalAddNewUser] = useState(false);

  const handleFilterRole = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newPrams = { ...params, [name]: value };
    onFilterAll(newPrams);
  };
  return (
    <div className={cx("form")}>
      <Form className={cx("form-filter")}>
        <Form.Group className={cx("form-group")} >
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
      </Form>
      <Button
        className={cx("btn-addNewUser")}
        variant="outlined"
        size="sm"
        onClick={() => toggleModalAddNewUser(!showModalAddNewUser)}
      >
        <AddIcon /> new
      </Button>
      <ModalAddNewUser
        show={showModalAddNewUser}
        onHide={() => toggleModalAddNewUser(!showModalAddNewUser)}
        closeModal={() => toggleModalAddNewUser(!showModalAddNewUser)}
      />
    </div>
  );
}
