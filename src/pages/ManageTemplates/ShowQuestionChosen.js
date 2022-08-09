import React, { useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "../ManageTemplates/template.module.scss";
import className from "classnames/bind";
import { useDispatch } from "react-redux";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import sliceContent from "../../helpers/sliceContent";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { removeQuestionFromTemplate } from "../../features/Templates/createTemplateSlice";

const cx = className.bind(styles);

export const ShowQuestionChosen = ({ QuestionChosen, dataTemplate, handleSubmitTemplate }) => {
  const [valueInput, setValueInput] = useState({
    name: "",
    description: "",
    public: "",
  });

  const dispatch = useDispatch();

  const handleRemoveChosenQuestion = async (data) => {
    dispatch(removeQuestionFromTemplate(data));
  };
  const handleChangePublic = (e) => {
    // console.log("e >>>", e.target)
    const value = e.target.value;
    const name = e.target.name;
    setValueInput({ ...valueInput, [name]: value });
    dataTemplate({ ...valueInput, [name]: value });
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
            onChange={handleChangePublic}
            required
          />
          <TextField
            id="outlined-basic"
            label="Description"
            name="description"
            color="warning"
            sx={{ ml: 7, width: 1 / 2 }}
            onChange={handleChangePublic}
          />
          <FormControl sx={{ width: 90, ml: 7 }} color="warning">
            <InputLabel id="demo-simple-select-label">Public</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              defaultValue={true}
              onChange={handleChangePublic}
              name="public"
            >
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
          <tbody>
            {QuestionChosen?.length > 0 &&
              QuestionChosen?.map((question, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{question?.content}</td>
                    <td>{sliceContent(question.answer)}</td>
                    <td>{question.category.name}</td>
                    <td>{question.level}</td>
                    <td>{question.createdDate}</td>
                    <td>{question.author.name}</td>
                    <td>{question.approver?.name}</td>
                    <td>{question.approvedDate}</td>
                    <td>
                      <DoDisturbOnIcon
                        color="error"
                        onClick={() => handleRemoveChosenQuestion(question)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <div className={cx("button")}>
        <Button variant="contained" color="inherit">
          Cancer
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmitTemplate}>
          Submit
        </Button>
      </div>
    </div>
  );
};
