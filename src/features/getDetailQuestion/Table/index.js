import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import className from "classnames/bind";
import styles from "./table.module.scss";
import Multiselect from "multiselect-react-dropdown";

const cx = className.bind(styles);

export const TableDetailQuestion = ({ data, readOnly, handleSave, valueInput, ...props }) => {
  const refContent = useRef();
  const refAnswer = useRef();

  // console.log("VAL ", value);

  // console.log("refContent >>>", refContent?.current?.value);
  const val = {
    content: refContent?.current?.value,
    answer: refAnswer?.current?.value,
  };
 
  // console.log("VAL ", val);

  const criteria = [];
  data.criteria?.forEach((element) => {
    criteria.push(element);
  });

  // console.log("REF >>>", refContent?.current?.value);
  return (
    <div>
      {" "}
      <Form className={cx("form")}>
        <Row className={cx("basicInfo", "mb-3")}>
          <Form.Group as={Col}>
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" defaultValue={data?.category?.name} readOnly={readOnly} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" defaultValue={data.status} readOnly={readOnly} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" defaultValue={data?.author?.name} readOnly={readOnly} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Level</Form.Label>
            <Form.Control type="text" defaultValue={data?.level} readOnly={readOnly} />
          </Form.Group>
        </Row>
        <Row className={cx("dateInfo", "mb-3")}>
          <Form.Group as={Col}>
            <Form.Label>Criteria</Form.Label>
            <Multiselect
              className={cx("criteria-multiselect")}
              options={props.criteria}
              selectedValues={criteria}
              disable={true}
              displayValue="name"
              showCheckbox={true}
              placeholder={null}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Create date</Form.Label>
            <Form.Control type="text" defaultValue={data?.createdDate} readOnly={readOnly} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Approve date</Form.Label>
            <Form.Control type="text" defaultValue={data?.approvedDate} readOnly={readOnly} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Update date</Form.Label>
            <Form.Control type="text" defaultValue={data?.updatedDate} readOnly={readOnly} />
          </Form.Group>
        </Row>
        <Row className={cx("content", "mb-3")}>
          <Form.Group as={Col}>
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              name="content"
              defaultValue={data?.content}
              readOnly={readOnly}
              autoFocus={true}
              ref={refContent}
            />
          </Form.Group>
        </Row>
        <Row className={cx("answer", "mb-3")}>
          <Form.Group as={Col}>
            <Form.Label>Answer</Form.Label>
            <Form.Control
              as="textarea"
              name="answer"
              type="text"
              defaultValue={data?.answer}A
              readOnly={readOnly}
              ref={refAnswer}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          {data.status === "PENDING" && (
            <Form.Group as={Col} className={cx("buttons")}>
              <Button variant="warning">Edit</Button>

              <Button variant="danger" onClick={props.handleShowModalReject}>
                Reject
              </Button>
              <Button variant="success" onClick={props.handleShowModalApprove}>
                Approve
              </Button>
            </Form.Group>
          )}
          {data.status === "APPROVED" && (
            <Form.Group as={Col} className={cx("buttons")}>
              <Button
                variant="warning"
                onClick={props.handleEditQuestion}
                hidden={props.showEditAndDeleteButton}
                size="lg"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={props.handleShowModalDelete}
                hidden={props.showEditAndDeleteButton}
                size="lg"
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                hidden={props.showSaveAndBackButton}
                size="lg"
                onClick={props.handleBack}
              >
                Cancer
              </Button>
              <Button
                variant="success"
                hidden={props.showSaveAndBackButton}
                size="lg"
                onClick={() => handleSave(val)}
              >
                Save
              </Button>
            </Form.Group>
          )}
        </Row>
      </Form>
    </div>
  );
};
