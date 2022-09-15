import className from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from "./CreateQuestion.module.scss";
import TextareaAutosize from "react-autosize-textarea";
import Multiselect from "multiselect-react-dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import questionBankApi from "../../../../src/services/questionBankApi";
import { getFilterCriteria } from "../../../features/getQuestionBank/FormFilter/getFilterCriteriaSlice";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const cx = className.bind(styles);

export const CreateQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.filterCategory);
  const criteria = useSelector((state) => state.filterCriteria);

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [content, setConent] = useState();
  const [answer, setAnswer] = useState();

  const [checkWaiting, setCheckWaiting] = useState(false);
  const [checkValidationError, setCheckValidationError] = useState(true);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/question">
      Question Bank
    </Link>,
    <Typography key="2">Create new question</Typography>,
  ];
  useEffect(() => {
    dispatch(getFilterCriteria());
  }, []);

  const validateForm = () => {
    return (
      selectedCategory > 0 &&
      selectedCategory !== "" &&
      selectedLevel !== undefined &&
      selectedLevel !== "" &&
      selectedCriteria?.length > 0 &&
      content !== undefined &&
      content.trim() !== "" &&
      answer !== undefined &&
      answer.trim() !== ""
    );
  };

  const cancel = () => {
    navigate("/question", { replace: true });
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedCriteria(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedCriteria(selectedList);
  };

  const handleCategoryChangeSelectValue = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLevelChangeSelectValue = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setCheckValidationError(true);
      setCheckWaiting(true);
      const dataInput = {
        answer: answer,
        content: content,
        category: { id: selectedCategory },
        criteria: selectedCriteria,
        level: selectedLevel,
      };

      questionBankApi
        .create(dataInput)
        .then((res) => {
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.log("ERROR createQuestionBank >>> " + error);
        })
        .finally((e) => {
          setCheckWaiting(false);
        });
    } else {
      setCheckValidationError(false);
    }
  };

  return (
    <div>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div>
        <form className={cx("form")} onSubmit={handleSubmit}>
          <fieldset>
            <legend className={cx("text-center")}>Create Question</legend>
            <div className={cx("row")}>
              <div className={cx("form-group", "col-sm")}>
                <label htmlFor="category">Category</label>
                <Form.Select
                  id="category"
                  className={cx("form-control")}
                  onChange={handleCategoryChangeSelectValue}
                >
                  <option value="">Select category</option>
                  {categoryList.map((item, index) => (
                    <option value={item?.id} key={index}>
                      {item?.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className={cx("form-group", "col-sm")}>
                <label htmlFor="level">Level</label>
                <Form.Select
                  id="level"
                  className={cx("form-control")}
                  onChange={handleLevelChangeSelectValue}
                >
                  <option value="">Select level</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </Form.Select>
              </div>
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="criteria">Criteria</label>
              <Multiselect
                className={cx("criteria-multiselect")}
                options={criteria}
                selectedValues={criteria.selectedValue}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
                showCheckbox={true}
                placeholder={"Select criteria"}
              />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="content">Content</label>
              <TextareaAutosize
                style={{ width: "100%", minHeight: "100px" }}
                onChange={(e) => setConent(e.target.value)}
              />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="answer">Answer</label>
              <TextareaAutosize
                style={{ width: "100%", minHeight: "100px" }}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className={cx("d-flex align-items-center justify-content-center", "div-btn")}>
              <button
                type="submit"
                className={cx("btn btn-primary")}
                disabled={checkWaiting ? true : false}
              >
                {checkWaiting ? (
                  <Spinner
                    className={cx("spinner")}
                    as="span"
                    variant="light"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    animation="border"
                  />
                ) : null}
                Submit
              </button>
              <button className={cx("btn btn-secondary btnn")} onClick={() => cancel()}>
                Cancel
              </button>
            </div>
            <div className={cx("aa")}></div>
            <p
              className={cx("error-text")}
              style={{
                visibility: checkValidationError ? "hidden" : "visible",
              }}
            >
              Please fill in all fields
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
