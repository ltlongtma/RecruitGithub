import * as React from "react";
import Box from "@mui/material/Box";
import { Questionbank } from "../../features/getQuestionBank";
import { ShowQuestionChosen } from "../../components/ShowQuestionChosenToTemPlate/index.js";
import questionTemplate from "../../services/questionTemplates";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

export const NewTemplate = ({ defaultValue, hiddenSaveButton, handleCancerButton }) => {
  const questionChosen = useSelector((state) => state.createTemplate);
  const categoryList = useSelector((state) => state.filterCategory);
  const navigate = useNavigate();
  const [valueInputSubmitTemPlate, setValueInputSubmitTemplate] = React.useState({
    ...defaultValue,
  });

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

      .catch((error) => {});
      await alert("Your Template has been created successfully");
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
        alert("Your Template was updated successfully");
      })
      .catch((err) => {
        console.log("ERROR Update Template >>>", err);
      });
    // window.location.reload();
    handleCancerButton();
  };
  return (
    <div>
      <Questionbank
        hiddenCreateButton={true}
        hiddenSelectStatusQuestion={true}
        showSelectColumn={true}
        navigateWithState={(e) => {
          navigate(`/question/${e}`, { state: true });
        }}
      />

      <Box sx={{ borderBottom: 3, borderColor: "block", m: 5 }}></Box>

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
    </div>
  );
};
