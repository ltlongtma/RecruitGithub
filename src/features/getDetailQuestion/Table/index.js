import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import className from "classnames/bind";
import styles from "./table.module.scss";
import { Badge } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";

const cx = className.bind(styles);


export const TableDetailQuestion = ({ data, ...props }) => {
  const criteria = [];
  data.criteria?.forEach((element) => {
    criteria.push(element);
  });
  // console.log(criteria);
  return (
    <div>
      {" "}
      <Form className={cx("form")}>
        <Row className={cx("basicInfo", "mb-3")}>
          <Form.Group as={Col}>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder={data?.category?.name}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" placeholder={data.status} readOnly />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder={data?.author?.name}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Level</Form.Label>
            <Form.Control type="text" placeholder={data?.level} readOnly />
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
            <Form.Control
              type="text"
              placeholder={data?.createdDate}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Approve date</Form.Label>
            <Form.Control
              type="text"
              placeholder={data?.approvedDate}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Update date</Form.Label>
            <Form.Control
              type="text"
              placeholder={data?.updatedDate}
              readOnly
            />
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
            <Form.Control
              as="textarea"
              type="text"
              placeholder={data?.answer}
              readOnly
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          {data.status === "PENDING" && (
            <Form.Group as={Col} className={cx("buttons")}>
              <Button variant="warning">Edit</Button>

              <Button variant="danger">Reject</Button>
              <Button variant="success" onClick={props.handleApproveQuestion}>
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
                Back
              </Button>
              <Button
                variant="success"
                hidden={props.showSaveAndBackButton}
                size="lg"
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
