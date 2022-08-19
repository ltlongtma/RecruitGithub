import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "./showQuestionChosen.module.scss";
import className from "classnames/bind";
import { useDispatch } from "react-redux";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import sliceContent from "../../helpers/sliceContent";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import {
  removeQuestionFromTemplate,
  sortableChosenTemplate,
} from "../../features/getTemplates/createTemplateSlice";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import moment from "moment";

const cx = className.bind(styles);

export const ShowQuestionChosen = ({
  questionChosen,
  dataTemplate,
  handleSubmitTemplate,
  filterCategory,
}) => {
  const [valueInput, setValueInput] = useState({
    category: {
      id: "",
    },
  });

  const [disableButtonSubmit, setDisableButtonSubmit] = useState(true);
  const dispatch = useDispatch();
  const handleRemoveChosenQuestion = async (data, e) => {
    dispatch(removeQuestionFromTemplate(data));
  };
  useEffect(() => {
    questionChosen !== null &&
    questionChosen.length > 0 &&
    valueInput?.name &&
    valueInput?.name !== "" &&
    valueInput?.description &&
    valueInput?.description !== "" &&
    valueInput?.category.id &&
    valueInput?.category.id !== ""
      ? setDisableButtonSubmit(false)
      : setDisableButtonSubmit(true);
  }, [valueInput, questionChosen]);
  const handleChangeinputvalue = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let newValueInput = { ...valueInput, [name]: value };
    if (name === "category") newValueInput = { ...valueInput, category: { id: value } };
    setValueInput(newValueInput);
    dataTemplate(newValueInput);
  };

  const SortableContainer = sortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
  });

  const SortableItem = sortableElement(({ question, sortIndex, handleRemoveChosenQuestion }) => {
    return (
      <tr key={sortIndex}>
        <td>{sortIndex + 1}</td>
        <td>{question?.content}</td>
        <td>{sliceContent(question.answer)}</td>
        <td>{question?.category?.name}</td>
        <td>{question?.level}</td>
        <td>{moment(question?.createDate).format("DD/MM/YYYY h:mm:ss")}</td>
        <td>{question?.author?.name}</td>
        <td>{question?.approver?.name}</td>
        <td>{moment(question?.approvedDate).format("DD/MM/YYYY h:mm:ss")}</td>

        <td>
          <Button
            onClick={() => {
              handleRemoveChosenQuestion(question);
            }}
          >
            <DoDisturbOnIcon color="error" className={cx("buttonRemove")} />
          </Button>
        </td>
      </tr>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newQuestionChosen = arrayMoveImmutable(questionChosen, oldIndex, newIndex);
    dispatch(sortableChosenTemplate(newQuestionChosen));
  };
  return (
    <div>
      <div>
        <Box className={cx("input-group")}>
          <TextField
            id="outlined-basic"
            label="Name"
            name="name"
            variant="outlined"
            color="warning"
            autoFocus
            sx={{ ml: 7 }}
            onChange={handleChangeinputvalue}
            required
          />

          <TextField
            id="outlined-basic"
            label="Description"
            name="description"
            color="warning"
            sx={{ ml: 7, width: 1 / 3 }}
            onChange={handleChangeinputvalue}
            required
          />

          <FormControl sx={{ width: 110, ml: 7 }} color="warning">
            <InputLabel>Category</InputLabel>

            <Select
              label="category"
              onChange={handleChangeinputvalue}
              name="category"
              defaultValue=""
            >
              {filterCategory?.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 90, ml: 7 }} color="warning">
            <InputLabel>Public</InputLabel>
            <Select label="Age" defaultValue={true} onChange={handleChangeinputvalue} name="public">
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <Table bordered hover responsive className={cx("table")}>
          <thead className={cx("table-head")}>
            <tr>
              <th>No.</th>
              <th>Content</th>
              <th>Answer</th>
              <th>Category</th>
              <th>Level</th>
              <th>Dated Added</th>
              <th>Author</th>
              <th>Approver</th>
              <th>Date Approved</th>
              <th>Remove</th>
            </tr>
          </thead>
          <SortableContainer onSortEnd={onSortEnd}>
            {questionChosen &&
              questionChosen?.map((question, index) => (
                <SortableItem
                  key={question.id}
                  index={index}
                  question={question}
                  sortIndex={index}
                  handleRemoveChosenQuestion={handleRemoveChosenQuestion}
                />
              ))}
          </SortableContainer>
        </Table>
      </div>
      <div className={cx("button")}>
        <Button variant="contained" color="inherit" onClick={() => window.location.reload()}>
          Cancer
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmitTemplate}
          disabled={disableButtonSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
