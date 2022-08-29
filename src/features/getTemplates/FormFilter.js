import React from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

let timeOut;
export const FormFilterTemplates = ({ onValueSearch }) => {
  const handelChangeInputSearch = (e) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      const value = e.target.value;
      onValueSearch(value);
    }, 500);
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
FormFilterTemplates.propTypes = {
  onValueSearch: PropTypes.func.isRequired,
};
