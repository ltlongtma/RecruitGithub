import React from "react";
import Table from "react-bootstrap/Table";
import styles from "../Table/table.module.scss";
import className from "classnames/bind";
import sliceContent from "../../../helpers/sliceContent";
import dayjs from "dayjs";

const cx = className.bind(styles);

export default function TableQuestion({ questionList, ...props }) {
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
            {questionList?.data.length > 0 && questionList?.data[0]?.status === "APPROVED" && (
              <>
                <th>Approver</th>
                <th>Date Approved</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {questionList?.data?.map((question, index) => {
            // console.log("questionList", questionList.status);
            return (
              <tr key={index} onClick={() => props.handleViewDetailQuestion(question.id)}>
                <td>{index + 1}</td>
                <td>{question?.content}</td>
                <td>{sliceContent(question.answer)}</td>
                <td>{question.category.name}</td>
                <td>{question.level}</td>
                <td>{question.createdDate}</td>
                <td>{question.author.name}</td>
                {question.status === "APPROVED" && (
                  <>
                    <td>{question.approver?.name}</td>
                    <td>{question.approvedDate}</td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
