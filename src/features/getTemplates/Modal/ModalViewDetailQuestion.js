import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../templates.module.scss";
import className from "classnames/bind";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Multiselect from "multiselect-react-dropdown";
import moment from "moment";

const cx = className.bind(styles);

export const ModalViewDetailQuestion = ({ data, closeModal, ...props }) => {
  return (
    <div>
      <Modal {...props} className={cx("modal")} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title-lg")}>Detail Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className={cx("form")}>
            <Row className={cx("basicInfo", "mb-3")}>
              <Form.Group as={Col}>
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" defaultValue={data?.category?.name} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" defaultValue={data?.status} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" defaultValue={data?.author?.name} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Level</Form.Label>
                <Form.Control type="text" defaultValue={data?.level} readOnly />
              </Form.Group>
            </Row>
            <Row className={cx("dateInfo", "mb-3")}>
              <Form.Group as={Col}>
                <Form.Label>Criteria</Form.Label>
                <Form.Control type="text" defaultValue={data?.criteria} readOnly />
                {/* <Multiselect
                  className={cx("criteria-multiselect")}
                  options={props.criteria}
                  selectedValues={props.criteria}
                  disable={true}
                  displayValue="name"
                  showCheckbox={true}
                  placeholder={null}
                /> */}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Create date</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={moment(data?.createdDate).format("DD/MM/YYYY h:mm:ss")}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Approve date</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={moment(data?.approvedDate).format("DD/MM/YYYY h:mm:ss")}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Update date</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={moment(data?.updatedDate).format("DD/MM/YYYY h:mm:ss")}
                  readOnly
                />
              </Form.Group>
            </Row>
            <Row className={cx("content", "mb-3")}>
              <Form.Group as={Col}>
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" name="content" defaultValue={data?.content} readOnly />
              </Form.Group>
            </Row>
            <Row className={cx("answer", "mb-3")}>
              <Form.Group as={Col}>
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  as="textarea"
                  name="answer"
                  type="text"
                  defaultValue={data?.answer}
                  readOnly
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
