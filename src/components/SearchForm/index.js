import React from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";


let timeOut;
export const SearchForm = ({ onValueSearch }) => {
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
      ></Form.Control>
    </div>
  );
};
SearchForm.propTypes = {
  onValueSearch: PropTypes.func.isRequired,
};
