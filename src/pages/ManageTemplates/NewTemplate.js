import * as React from "react";
import Box from "@mui/material/Box";
import { Questionbank } from "../../features/getQuestionBank";
import { ShowQuestionChosen } from "../../components/ShowQuestionChosenToTemPlate/index.js";
import questionTemplate from "../../services/questionTemplates";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { ModalViewDetailQuestion } from "../../features/getTemplates/Modal/ModalViewDetailQuestion";
import { getDetailQuestion } from "../../features/getDetailQuestion/Slice";

export const NewTemplate = ({
  defaultValue,
  hiddenSaveButton,
  handleCancerButton,
  setTileAlert,
  setOpenAlert,
}) => {
  const questionChosen = useSelector((state) => state.template.createTemplate);
  const categoryList = useSelector((state) => state.filterCategory);
  const navigate = useNavigate();
  const [valueInputSubmitTemPlate, setValueInputSubmitTemplate] = React.useState({
    ...defaultValue,
  });
  const dataDetaiQuestion = useSelector((state) => state.getDetailQuestion);

  const [showModalViewDetailQuestion, setShowModalViewDetailQuestion] = React.useState(false);
  const dispatch = useDispatch();

  const handleSetValueInput = async (data) => {
    const newData = await {
      ...valueInputSubmitTemPlate,
      ...data,
    };
    setValueInputSubmitTemplate(newData);
    // console.log("data >>>", newData);
  };
  const handleSubmitTemplate = async () => {
    const data = questionChosen?.map((item, index) => {
      return { questionId: item.id };
    });
    const payload = {
      ...valueInputSubmitTemPlate,
      questionBankTemplates: data,
    };
    questionTemplate
      .create(payload)
      .then(
        await setTileAlert("Your Template has been created successfully"),
        await setOpenAlert(true)
      )

      .catch((error) => {});

    handleCancerButton();
  };
  const handleSaveChangeTemplate = async () => {
    const data = questionChosen?.map((item, index) => {
      return { questionId: item.id };
    });
    const newData = {
      ...valueInputSubmitTemPlate,
      questionBankTemplates: data,
    };
    setValueInputSubmitTemplate(newData);
    await questionTemplate
      .upDate(newData.id, newData)
      .then((result) => {
        alert("Your Template was updated successfully.");
      })
      .catch((err) => {
        console.log("ERROR Update Template >>>", err);
      });
    handleCancerButton();
  };
  //Handle ModalViewDetailQuestion
  const handleCloseModalViewDetailQuestion = () => setShowModalViewDetailQuestion(false);
  const hanldeModalDetailQuestion = async (data) => {
    console.log("E >>", data);
    await dispatch(getDetailQuestion(data));
    setShowModalViewDetailQuestion(true);
  };
  return (
    <div>
      <Questionbank
        hiddenCreateButton={true}
        hiddenSelectStatusQuestion={true}
        showSelectColumn={true}
        hanldeModalDetailQuestion={hanldeModalDetailQuestion}
      />

      <Box sx={{ borderBottom: 3, borderColor: "orange", m: 5 }}></Box>

      <ShowQuestionChosen
        questionChosen={questionChosen}
        dataTemplate={(data) => handleSetValueInput(data)}
        handleSubmitTemplate={handleSubmitTemplate}
        filterCategory={categoryList}
        defaultValue={defaultValue}
        hiddenSaveButton={hiddenSaveButton}
        handleSaveChangeTemplate={handleSaveChangeTemplate}
        handleCancerButton={handleCancerButton}
      />
      <ModalViewDetailQuestion
        centered
        show={showModalViewDetailQuestion}
        onHide={handleCloseModalViewDetailQuestion}
        closeModal={handleCloseModalViewDetailQuestion}
        data={dataDetaiQuestion}
      />
    </div>
  );
};
