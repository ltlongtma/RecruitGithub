import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionBank } from "./getQuestionBankSlice";
import Table from "react-bootstrap/Table";

export const Questionbank = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("isToken");
  const QuestionList = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/question`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getQuestionBank(res.data));
      })
      .catch((err) => {
        console.log("ERROR " + err);
      });
  }, [dispatch]);
  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Num</th>
            <th>ID</th>
            <th>Content</th>
            <th>Category</th>
            <th>Level</th>
            <th>Dated_added</th>
            <th>Author</th>
            <th>Approver</th>
            <th>Date_approved</th>
          </tr>
        </thead>
        <tbody>
          {QuestionList.map((question, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{question.id}</td>
                <td>{question.content}</td>
                <td>{question.category.name}</td>
                <td>{question.category.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
