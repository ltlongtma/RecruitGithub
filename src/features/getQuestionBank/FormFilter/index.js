import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SearchIcon from "@mui/icons-material/Search";
import className from "classnames/bind";
import styles from "./form.module.scss";

const cx = className.bind(styles);

export const FormFilter = ({ onFilterAll, onFilterCategory }) => {
  const [paramStatus, setParamStatus] = useState({
    page: 1,
    pageSize: 5,
    status: "APPROVED",
  });

  const handleChangeSelectValue = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    const newParamStatus = { ...paramStatus, [name]: value };
    setParamStatus(newParamStatus);
    onFilterAll(newParamStatus);
  };

  return (
    <div>
      {" "}
      <Form className={cx("form")}>
        <Form.Group className={cx("form-group")} controlId="exampleForm.ControlInput1">
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
          >
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
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
    </div>
  );
};
