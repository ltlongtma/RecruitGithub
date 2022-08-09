import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SearchIcon from "@mui/icons-material/Search";
import className from "classnames/bind";
import styles from "./form.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";

const cx = className.bind(styles);

export const FormFilter = ({
  onFilterAll,
  onFilterCategory,
  paramStatus,
  hiddenCreateButton,
  hiddenSelectStatusQuestion,
}) => {
  const navigate = useNavigate();

  const handleChangeSelectValue = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    const newParamStatus = { ...paramStatus, [name]: value };
    onFilterAll(newParamStatus);
  };
  const handleCreateQuestion = () => {
    navigate("/question/create");
  };

  return (
    <div className={cx("form")}>
      <Form className={cx("form-filter")}>
        <Form.Group className={cx("form-group")}>
          <Form.Select
            className={cx("form-group-input")}
            onChange={handleChangeSelectValue}
            name="level"
          >
            <option value="">Level - All</option>

            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </Form.Select>
          <Form.Select
            className={cx("form-group-input")}
            onChange={handleChangeSelectValue}
            name="categoryId"
          >
            <option value="">Category - All</option>
            {onFilterCategory?.map((item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            className={cx("form-group-input")}
            onChange={handleChangeSelectValue}
            name="status"
            hidden={hiddenSelectStatusQuestion}
          >
            <option value="APPROVED">Approved</option>

            <option value="PENDING">Pending</option>
          </Form.Select>

          <Form.Control
            className={cx("form-group-input")}
            type="text"
            placeholder="Search..."
            name="keyword"
            onChange={handleChangeSelectValue}
          />
        </Form.Group>
        <Button variant="outline-success" size="sm">
          <SearchIcon />
        </Button>
      </Form>
      <Button
        variant="success"
        size="sm"
        onClick={handleCreateQuestion}
        hidden={hiddenCreateButton}
      >
        <AddIcon /> Create New Question
      </Button>
    </div>
  );
};
