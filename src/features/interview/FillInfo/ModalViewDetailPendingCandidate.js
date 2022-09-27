import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../FillInfo/module.scss";
import className from "classnames/bind";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";

const cx = className.bind(styles);

export const ModalViewDetailPendingCandidate = ({ data, closeModal, ...props }) => {
  return (
    <div>
      <Modal {...props} className={cx("modal")} size="lg" centered>
        <Modal.Header closeButton className={cx("modalHeader")}>
          <Modal.Title className={cx("modalTitle")}>Detail Pending Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className={cx("modalBody")}>
            <Row className={cx("mb-4")}>
              <Form.Group as={Col}>
                <Form.Label>NAME</Form.Label>
                <Form.Control type="text" defaultValue={data?.candidate?.name} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>GENDER</Form.Label>
                <Form.Control type="text" defaultValue={data?.candidate?.gender} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>BIRTH</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={moment(data?.candidate?.birthday).format("DD/MM/YYYY")}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>PHONE</Form.Label>
                <Form.Control type="text" defaultValue={data?.candidate?.phone} readOnly />
              </Form.Group>
            </Row>
            <Row className={cx("mb-4")}>
              <Form.Group as={Col}>
                <Form.Label>GRADUATE</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={data?.candidate?.educationStatus}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>GPA</Form.Label>
                <Form.Control type="text" defaultValue={data?.candidate?.gpa} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>POSITION</Form.Label>
                <Form.Control type="text" defaultValue={data?.candidate?.position} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>MODE</Form.Label>
                <Form.Control type="text" defaultValue={data?.workMode} readOnly />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>INTERVIEWER 1</Form.Label>
                <Form.Control type="text" defaultValue={data?.interviewer1?.name} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>INTERVIEWER 2</Form.Label>
                <Form.Control type="text" defaultValue={data?.interviewer2?.name} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>INTERVIEW DATE</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={moment(data?.interviewDate).format("DD/MM/YYYY")}
                  readOnly
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
