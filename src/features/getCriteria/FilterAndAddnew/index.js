import React, { useState } from "react";
import className from "classnames/bind";
import styles from "./filter.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { Form } from "react-bootstrap";
import { Button, FormGroup } from "@mui/material";
import { ModalAddNewCriteria } from "../Modal/AddNewCriteria";
import questionCriteriaApi from "../../../services/questionCriteriaApi";
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
    // setParamStatus(newParamStatus);
    onFilterStatus(newParamStatus);
  };
  const handleModalAddNewCriteria = async (e) => {
    if (e !== "") {
      questionCriteriaApi
        .create(e)
        .then( await setOpenAlert(true))

        .catch((e) => {
          console.log("ERROR in addNewCriteria ", e);
        });
    } else return;
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
          <Form.Select name="active" onChange={handleChangeSelectValueStatus}>
            <option value="">Status - All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
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
        variant="outlined"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <AddIcon /> New
      </Button>
      <ModalAddNewCriteria
        show={showModal}
        handleClose={() => {
          setShowModal(!showModal);
        }}
        handleModalAddNewCriteria={handleModalAddNewCriteria}
      />
      <div>
        <AlertSuccess
          title="A new criteria was added successfully"
          openAlert={openAlert}
          closeAlert={handleCloseAlert}
        />
      </div>
    </div>
  );
};
