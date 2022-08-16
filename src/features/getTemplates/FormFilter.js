import React from "react";
import Form from "react-bootstrap/Form";

export const FormFilterTemplates = ({ valueSearch }) => {
  const handelChangeInputSearch = (e) => {
    const value = e.target.value;
    valueSearch(value);
  };
  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search..."
        name="keyword"
        onChange={handelChangeInputSearch}
      />
    </div>
  );
};
