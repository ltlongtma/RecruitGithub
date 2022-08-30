import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const ModalAddNewCriteria = ({ show, handleClose, handleModalAddNewCriteria }) => {
  const [valueInput, setValueInput] = useState({ name: "" });
  const [disableButtonSaveChange, setDisableButtonSaveChange] = useState(true);

  const handleChange = (e) => {
    const value = e.target.value;
    value !== "" && value.length > 0
      ? setDisableButtonSaveChange(false)
      : setDisableButtonSaveChange(true);
    setValueInput({ name: value });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Criteria</Modal.Title>
        </Modal.Header>

        <form onSubmit={async () => await handleModalAddNewCriteria(valueInput)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="ModalAddNewCriteria">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Criteria Name"
                autoFocus
                onChange={handleChange}
                value={valueInput?.name}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancer
            </Button>
            <Button variant="success" type="submit" disabled={disableButtonSaveChange}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
