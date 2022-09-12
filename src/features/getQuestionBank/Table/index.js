import React from "react";
import Table from "react-bootstrap/Table";
import styles from "../Table/table.module.scss";
import className from "classnames/bind";
import sliceContent from "../../../helpers/sliceContent";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionToTemplate, removeQuestionFromTemplate } from "../../getTemplates/Slice";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpZA } from "@fortawesome/free-solid-svg-icons";

const cx = className.bind(styles);

export default function TableQuestion({
  questionList,
  showSelectColumn,
  handleViewDetailQuestion,
}) {
  const dispatch = useDispatch();
  const questionChosen = useSelector((state) => state.template.createTemplate);
  const handleChangeCheckbox = (e, data) => {
    e.target.checked === true
      ? dispatch(addQuestionToTemplate(data))
      : dispatch(removeQuestionFromTemplate(data));
  };
  return (
    <div>
      <Table hover responsive className={cx("table")}>
        <thead className={cx("table-head")}>
          <tr>
            <th>No.</th>
            <th className={cx("headContext")}>
              Content
              <FontAwesomeIcon icon={faArrowUpZA} className={cx("tableIconSort")} />
            </th>
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
              <tr
                key={index}
                onClick={() => handleViewDetailQuestion(question.id)}
                className={cx("tableBody")}
              >
                <td>
                  {questionList.pagination.pageSize * (questionList.pagination.page - 1) +
                    1 +
                    index}
                </td>
                <td>{question?.content}</td>
                <td>{sliceContent(question.answer)}</td>
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
                  <td onClick={(e) => e.stopPropagation()}>
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
