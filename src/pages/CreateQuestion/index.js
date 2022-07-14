import className from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from "./CreateQuestion.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import TextareaAutosize from "react-autosize-textarea";
import Multiselect from "multiselect-react-dropdown";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/AxiosClient";
import { useDispatch, useSelector } from "react-redux";
import questionBankApi from "../../../src/services/questionBankApi";
import questionCategoryApi from "../../services/questionCategoryApi";
import questionCriteriaApi from "../../services/questionCriteriaApi";
import { getFilterCategory } from "../../features/getQuestionBank/FormFilter/getFilterCategorySlice";
import { getFilterCriteria } from "../../features/getQuestionBank/FormFilter/getFilterCriteriaSlice";
import { Spinner } from "react-bootstrap";

const cx = className.bind(styles);
const token = sessionStorage.getItem("isToken");

// function onRemove(selectedList, removedItem) {}

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

  useEffect(() => {
    questionCategoryApi
      .getAll()
      .then((res) => {
        dispatch(getFilterCategory(res));
      })
      .catch((error) => {
        console.log("ERROR getFilterCategory >>> " + error);
      });

    questionCriteriaApi
      .getAll()
      .then((res) => {
        dispatch(getFilterCriteria(res));
      })
      .catch((error) => {
        console.log("ERROR getFilterCriteria >>> " + error);
      });
  }, [dispatch]);

  const validateForm = () => {
    return (
      selectedCategory > 0 &&
      selectedCategory !== "" &&
      selectedLevel !== undefined &&
      selectedLevel !== "" &&
      selectedCriteria?.length > 0 &&
      content !== undefined &&
      content !== "" &&
      answer !== undefined &&
      answer !== ""
    );
  };

  const cancel = () => {
    navigate("/", { replace: true });
  };

  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList);
    setSelectedCriteria(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    console.log(selectedList);
    setSelectedCriteria(selectedList);
  };

  const handleCategoryChangeSelectValue = (e) => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const handleLevelChangeSelectValue = (e) => {
    console.log(e.target.value);
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
          console.log(res);
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
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Question bank</Breadcrumb.Item>
          <Breadcrumb.Item active>Create</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Create Question:</legend>

            <div className={cx("form-group")}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className={cx("form-control")}
                onChange={handleCategoryChangeSelectValue}
                // options={categoryList}
              >
                <option value=""></option>
                {categoryList.map((item, index) => (
                  <option value={item?.id} key={index}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="level">Level</label>
              <select
                id="level"
                className={cx("form-control")}
                onChange={handleLevelChangeSelectValue}
              >
                <option value=""></option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="criteria">Criteria</label>
              <Multiselect
                options={criteria}
                selectedValues={criteria.selectedValue}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
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

            <div
              className={cx(
                "d-flex align-items-center justify-content-center",
                "div-btn"
              )}
            >
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

              <button className={cx("btn btn-secondary btnn")} onClick={cancel}>
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
