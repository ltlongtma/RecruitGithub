import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import className from "classnames/bind";
import styles from "./getDetailQuestion.module.scss";
import Row from "react-bootstrap/Row";
import questionBankApi from "../../services/questionBankApi";
import { getDetailQuestion } from "./getDetailQuestionSlice";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionBank } from "../getQuestionBank/getQuestionBankSlice";

const cx = className.bind(styles);

export const DetailQuestion = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSaveAndBackButton, setShowSaveAndbackButton] = useState(true);
  const [showEditAndDeleteButton, setShowEditAndDeleteButton] = useState(false);

  const { questionId } = useParams();
  useEffect(() => {
    questionBankApi
      .getById(questionId)
      .then((response) => {
        dispatch(getDetailQuestion(response));
      })
      .catch((error) => {
        console.log("ERROR getDetailQuestion >>>", error);
      });
  }, []);
  const handleApproveQuestion = () => {
    questionBankApi
      .approveQuestion(questionId, data)
      .then((response) => {})
      .catch((error) => {
        console.log("ERROR APPROVE QUESTION >>>", error);
      });
    alert("APPROVE SUCCESSFUL");
    navigate(`../question`);
  };
  const handleDeleteQuestion = () => {
    // questionBankApi
    //   .delete(questionId)
    //   .then((response) => {
    //     // console.log("DELETE QUESTION >>>", response);
    //   })
    //   .catch((error) => {
    //     console.log("ERROR DELETE QUESTION >>>", error);
    //   });
    // alert("DELETE SUCCESSFUL");
    // questionBankApi
    //   .getAll()

    //   .then((res) => {
    //     dispatch(getQuestionBank(res.data));
    //   })
    //   .catch((error) => {
    //     console.log("ERROR getQuestionBank >>> " + error);
    //   });

    navigate(`../question`);
  };
  const handleEditQuestion = () => {
    setShowSaveAndbackButton(false);
    setShowEditAndDeleteButton(true);
  };
  const handleBack = () => {
    setShowSaveAndbackButton(true);
    setShowEditAndDeleteButton(false);
  };

  return (
    <div>
      <Form className={cx("form")}>
        <Row className={cx("basicInfo", "mb-3")}>
          <Form.Group as={Col}>
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder={data?.category?.name} readOnly />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" placeholder={data.status} readOnly />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder={data?.author?.name} readOnly />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Level</Form.Label>
            <Form.Control type="text" placeholder={data?.level} readOnly />
          </Form.Group>
        </Row>
        <Row className={cx("dateInfo", "mb-3")}>
          <Form.Group as={Col}>
            <Form.Label>Create date</Form.Label>
            <Form.Control type="text" placeholder={data?.createdDate} readOnly />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Approve date</Form.Label>
            <Form.Control type="text" placeholder={data?.approvedDate} readOnly />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Update date</Form.Label>
            <Form.Control type="text" placeholder={data?.updatedDate} readOnly />
          </Form.Group>
        </Row>
        <Row className={cx("content", "mb-3")}>
          <Form.Group as={Col}>
            <Form.Label>Content</Form.Label>
            <Form.Control type="text" placeholder={data?.content} readOnly />
          </Form.Group>
        </Row>
        <Row className={cx("answer", "mb-3")}>
          <Form.Group as={Col}>
            <Form.Label>Answer</Form.Label>
            <Form.Control as="textarea" type="text" placeholder={data?.answer} readOnly />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          {data.status === "PENDING" && (
            <Form.Group as={Col} className={cx("buttons")}>
              <Button variant="warning">Edit</Button>

              <Button variant="danger">Reject</Button>
              <Button variant="success" onClick={handleApproveQuestion}>
                Approve
              </Button>
            </Form.Group>
          )}
          {data.status === "APPROVED" && (
            <Form.Group as={Col} className={cx("buttons")}>
              <Button
                variant="warning"
                onClick={handleEditQuestion}
                hidden={showEditAndDeleteButton}
                size="lg"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteQuestion}
                hidden={showEditAndDeleteButton}
                size="lg"
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                hidden={showSaveAndBackButton}
                size="lg"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button variant="success" hidden={showSaveAndBackButton} size="lg">
                Save
              </Button>
            </Form.Group>
          )}
        </Row>
      </Form>
    </div>
  );
};
