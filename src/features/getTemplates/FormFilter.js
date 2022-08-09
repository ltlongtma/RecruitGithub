import React from "react";
import Form from "react-bootstrap/Form";

export const FormFilterTemplates = () => {
  return (
    <div>
      <Form.Select name="status">
        <option value="APPROVED">Approved</option>

        <option value="PENDING">Pending</option>
      </Form.Select>

      <Form.Control type="text" placeholder="Search..." name="keyword" />
    </div>
  );
};
