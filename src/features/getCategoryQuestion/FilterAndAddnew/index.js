import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import className from "classnames/bind";
import styles from "./filter.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { Form } from "react-bootstrap";
import { FormGroup } from "@mui/material";
import { ModalAddNewCategory } from "../Modal/modalAddNew";
import questionCategoryApi from "../../../services/questionCategoryApi";

const cx = className.bind(styles);

export const FilterAndAddNew = ({ data, onFilterStatus }) => {
  const [showModal, setShowModal] = useState(false);

  const [paramStatus, setParamStatus] = useState({
    enable: "",
    keyword: "",
    page: 1,
    pageSize: 10,
  });

  const options = [];
  data?.map((item, index) => {
    options.push({ label: item.name, value: index });
  });
  const handleChangeSelectValueStatus = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newParamStatus = { ...paramStatus, [name]: value };
    setParamStatus(newParamStatus);
    onFilterStatus(newParamStatus);
  };
  const handleModalAddNewCategory = (e) => {
    // console.log("E >>>", e);
    if (e !== "") {
      questionCategoryApi
        .create(e)
        .then(() => {
          alert("New category added successfully");
        })

        .catch((e) => {
          console.log("ERROR in addNewCategory ", e);
        });
    } else return;
  };

  return (
    <div className={cx("form")}>
      <Form className={cx("form-filter")}>
        <FormGroup className={cx("form-group")}>
          <Form.Select name="enable" onChange={handleChangeSelectValueStatus}>
            <option value="">Status - All</option>
            <option value="true">Enable</option>
            <option value="false">Disable</option>
          </Form.Select>
        </FormGroup>
        <FormGroup className={cx("form-group")}>
          <Form.Control
            className={cx("form-group-input")}
            type="text"
            placeholder="Search..."
            onChange={handleChangeSelectValueStatus}
            name="keyword"
          />
        </FormGroup>
      </Form>
      <Button
        className={cx("btn-addNewCategory")}
        variant="success"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <AddIcon /> New category
      </Button>
      <ModalAddNewCategory
        show={showModal}
        handleClose={() => {
          setShowModal(!showModal);
        }}
        handleModalAddNewCategory={handleModalAddNewCategory}
      />
    </div>
  );
};
