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
} from "../../features/getTemplates/Slice";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import moment from "moment";

const cx = className.bind(styles);

export const ShowQuestionChosen = ({
  questionChosen,
  dataTemplate,
  handleSubmitTemplate,
  filterCategory,
  defaultValue,
  hiddenSaveButton,
  handleSaveChangeTemplate,
  handleCancerButton,
}) => {
  const [defaultQuestionIds, setDefaultQuestionIds] = useState([]);
  const [valueInput, setValueInput] = useState({
    name: "" || defaultValue?.name,
    description: "" || defaultValue?.description,
    category: {
      id: defaultValue?.category?.id === undefined ? "" : String(defaultValue?.category?.id),
    },
    public: defaultValue?.public === undefined ? true : defaultValue?.public,
  });

  const [disableButtonSubmit, setDisableButtonSubmit] = useState(true);
  const [hiddenGuideTip, setHiddenGuideTip] = useState(true);

  const [statusSaveButton, setStatusSaveButton] = useState(hiddenSaveButton);
  const dispatch = useDispatch();
  const handleRemoveChosenQuestion = async (data, e) => {
    dispatch(removeQuestionFromTemplate(data));
  };
  useEffect(() => {
    const idArray = defaultValue?.questionBankTemplates?.map((data) => {
      return `${data.questionNo}_${data.question.id}`;
    });
    setDefaultQuestionIds(idArray);
  }, [defaultValue]);
  useEffect(() => {
    //An new array obtain question list from the default value
    const newQuestionChosen = questionChosen?.filter((question, index) =>
      defaultQuestionIds?.includes(`${index + 1}_${question.id}`)
    );
    questionChosen.length > 0 ? setHiddenGuideTip(false) : setHiddenGuideTip(true);
    questionChosen !== null &&
    questionChosen.length > 0 &&
    valueInput?.name &&
    valueInput?.name !== "" &&
    valueInput?.description &&
    valueInput?.description !== "" &&
    valueInput?.category.id &&
    valueInput?.category.id !== "" &&
    (valueInput.name != defaultValue?.name ||
      valueInput.description != defaultValue?.description ||
      valueInput.category.id != defaultValue?.category.id ||
      valueInput.public != defaultValue?.public ||
      newQuestionChosen.length !== defaultQuestionIds.length ||
      questionChosen.length !== defaultValue.questionBankTemplates.length)
      ? setDisableButtonSubmit(false)
      : setDisableButtonSubmit(true);
  }, [valueInput, questionChosen]);

  const handleChangeinputvalue = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let newValueInput = { ...valueInput, [name]: value };
    if (name === "category") newValueInput = { ...valueInput, category: { id: value } };
    setValueInput(newValueInput);
    // console.log("VAL >>>", valueInput);
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
        <td>{sliceContent(question?.answer)}</td>
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
            defaultValue={valueInput?.name}
          />

          <TextField
            id="outlined-basic"
            label="Description"
            name="description"
            color="warning"
            sx={{ ml: 7, width: 1 / 3 }}
            onChange={handleChangeinputvalue}
            required
            defaultValue={valueInput?.description}
          />

          <FormControl sx={{ width: 110, ml: 7 }} color="warning">
            <InputLabel>Category</InputLabel>

            <Select
              label="category"
              onChange={handleChangeinputvalue}
              name="category"
              defaultValue={""}
              required
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
            <Select label="Age" onChange={handleChangeinputvalue} name="public" defaultValue={true}>
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <i hidden={hiddenGuideTip} className={cx("guideTip")}>
          *Drag and drop to sort items*
        </i>
        <Table hover responsive className={cx("table")}>
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
                  key={question?.id}
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
        <Button variant="contained" color="inherit" onClick={handleCancerButton}>
          Cancer
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitTemplate}
          disabled={disableButtonSubmit}
          hidden={!statusSaveButton}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleSaveChangeTemplate}
          disabled={disableButtonSubmit}
          hidden={statusSaveButton}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
