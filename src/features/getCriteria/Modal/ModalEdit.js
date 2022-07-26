import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const ModalEditCriteria = ({ show, handleClose, name, id, handleSubmitEditCriteria }) => {
  const [inputNameCriteria, setInputNameCriteria] = useState("");
  const [disableButtonSaveChange, setDisableButtonSaveChange] = useState(true);

  const handleChangeValueInput = (e) => {
    const value = e.target.value;
    setInputNameCriteria(value);
    value !== "" && value.length > 0
      ? setDisableButtonSaveChange(false)
      : setDisableButtonSaveChange(true);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <form onSubmit={async () => await handleSubmitEditCriteria(id, inputNameCriteria)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Criteria Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Old Name</Form.Label> <Form.Control placeholder={name} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>New Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category Name"
                autoFocus
                onChange={handleChangeValueInput}
                value={inputNameCriteria}
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
