import React from "react";
import Table from "react-bootstrap/Table";
import styles from "../Table/table.module.scss";
import className from "classnames/bind";
import sliceContent from "../../../helpers/sliceContent";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestionToTemplate,
  removeQuestionFromTemplate,
} from "../../getTemplates/createTemplateSlice";
import moment from "moment";

const cx = className.bind(styles);

export default function TableQuestion({ questionList, showSelectColumn, ...props }) {
  const dispatch = useDispatch();
  const questionChosen = useSelector((state) => state.createTemplate);

  const handleChangeCheckbox = (e, data) => {
    e.target.checked === true
      ? dispatch(addQuestionToTemplate(data))
      : dispatch(removeQuestionFromTemplate(data));
  };
  return (
    <div>
      <Table bordered hover responsive className={cx("table")}>
        <thead className={cx("table-head")}>
          <tr>
            <th>No.</th>
            <th>Content</th>
            <th>Answer</th>
            <th>Category</th>
            <th>Level</th>
            <th>Dated Added</th>
            <th>Author</th>
            {questionList?.data?.length > 0 && questionList?.data[0]?.status === "APPROVED" && (
              <>
                <th>Approver</th>
                <th>Date Approved</th>
              </>
            )}
            {showSelectColumn && <th>Select</th>}
          </tr>
        </thead>
        <tbody>
          {questionList?.data?.map((question, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td onClick={() => props.handleViewDetailQuestion(question.id)}>
                  {question?.content}
                </td>
                <td onClick={() => props.handleViewDetailQuestion(question.id)}>
                  {sliceContent(question.answer)}
                </td>
                <td>{question.category.name}</td>
                <td>{question.level}</td>
                <td>{moment(question?.createdDate).format("DD/MM/YYYY h:mm:ss")}</td>
                <td>{question.author.name}</td>
                {question.status === "APPROVED" && (
                  <>
                    <td>{question.approver?.name}</td>
                    <td>{moment(question?.approvedDate).format("DD/MM/YYYY h:mm:ss")}</td>
                  </>
                )}
                {showSelectColumn && (
                  <td>
                    <Checkbox
                      checked={questionChosen.findIndex((item) => item.id === question.id) >= 0}
                      onChange={(e) => handleChangeCheckbox(e, question)}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
