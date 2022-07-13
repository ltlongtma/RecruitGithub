import className from "classnames/bind";
import React, {useEffect, useState } from "react";
import styles from "./CreateQuestion.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import TextareaAutosize from "react-autosize-textarea";
import Multiselect from "multiselect-react-dropdown";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/AxiosClient";

const cx = className.bind(styles);
const token = sessionStorage.getItem("isToken");

const a = {
  options: [
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
    { name: "Option 3", id: 3 },
    { name: "Option 4", id: 4 },
    { name: "Option 5", id: 5 },
  ],
};
const onSelect = (selectedList, selectedItem) => {
  console.log(selectedItem);
};

const loadCategory = () => {
      axiosClient
        .get(
          "question-category",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
            return res.data
        })
        .catch((errors) => {
          console.log("ERROR " + errors);
          return null;
        });
  };

  const loadCriteria = () => {
    axiosClient
      .get(
        "question-criteria",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
          return res.data
      })
      .catch((errors) => {
        console.log("ERROR " + errors);
        return null;
      });
};

// function onRemove(selectedList, removedItem) {}

export const CreateQuestion = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [level, setLevel] = useState();
  const [criteria, setCriteria] = useState();
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setCategory(loadCategory());
    setCriteria(loadCriteria());
  }, [])

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
        <form>
          <fieldset>
            <legend>Create Question:</legend>

            <div className={cx("form-group")}>
              <label htmlFor="category">Category</label>
              <select id="category" className={cx("form-control")} options={category}>
                <option defaultValue>Category...</option>
                <option>...</option>
              </select>
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="level">Level</label>
              <select id="level" className={cx("form-control")}>
                <option defaultValue>Level...</option>
                <option>...</option>
              </select>
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="criteria">Criteria</label>
              <Multiselect
                options={a.options}
                selectedValues={a.selectedValue}
                onSelect={onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name"
              />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="content">Content</label>
              <TextareaAutosize style={{ width: "100%", minHeight: "100px" }} />
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="answer">Answer</label>
              <TextareaAutosize style={{ width: "100%", minHeight: "100px" }} />
            </div>

            <button type="submit" className={cx("btn btn-primary")}>
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
