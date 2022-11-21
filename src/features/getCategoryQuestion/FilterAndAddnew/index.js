import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./filter.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { Form, FormLabel } from "react-bootstrap";
import { Button, FormGroup } from "@mui/material";
import { ModalAddNewCategory } from "../Modal/modalAddNew";
import questionCategoryApi from "../../../services/questionCategoryApi";
import AlertSuccess from "../../../components/Alert";

const cx = className.bind(styles);

export const FilterAndAddNew = ({ data, onFilterStatus, paramStatus }) => {
  const [showModal, setShowModal] = useState(false);

  const options = [];
  data?.data.map((item, index) => {
    options.push({ label: item.name, value: index });
  });
  const handleChangeSelectValueStatus = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newParamStatus = { ...paramStatus, [name]: value };

    onFilterStatus(newParamStatus);
  };
  const handleModalAddNewCategory = async (e) => {
    if (e !== "") {
      questionCategoryApi
        .create(e)
        .then(await setOpenAlert(true))

        .catch((e) => {
          console.log("ERROR in addNewCategory ", e);
        });
    }
  };
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <div className={cx("form")}>
      <Form className={cx("form-filter")}>
        <FormGroup className={cx("form-group")}>
          <FormLabel>STATUS</FormLabel>
          <Form.Select
            name="active"
            onChange={handleChangeSelectValueStatus}
            className={cx("form-group-input")}
          >
            <option value="">Status - All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Form.Select>
        </FormGroup>
        {/* <FormGroup className={cx("form-group")}>
          <Form.Control
            className={cx("form-group-input")}
            type="text"
            placeholder="Search..."
            onChange={handleChangeSelectValueStatus}
            name="keyword"
          />
        </FormGroup> */}
      </Form>

      {/* <Button
        variant="outlined"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <AddIcon /> New
      </Button>
      <ModalAddNewCategory
        show={showModal}
        handleClose={() => {
          setShowModal(!showModal);
        }}
        handleModalAddNewCategory={handleModalAddNewCategory}
      /> */}
      <div>
        <AlertSuccess
          title="A new category was added successfully"
          openAlert={openAlert}
          closeAlert={handleCloseAlert}
        />
      </div>
    </div>
  );
};
