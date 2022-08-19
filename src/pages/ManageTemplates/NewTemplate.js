import * as React from "react";
import Box from "@mui/material/Box";
import { Questionbank } from "../../features/getQuestionBank";
import { ShowQuestionChosen } from "../../components/ShowQuestionChosenToTemPlate/index.js";
import questionTemplate from "../../services/questionTemplates";
import { useDispatch, useSelector } from "react-redux";
import questionBankApi from "../../services/questionBankApi";
import { getFilterCategory } from "../../features/getQuestionBank/FormFilter/getFilterCategorySlice";
import { useNavigate } from "react-router-dom";

export const NewTemplate = () => {
  const questionChosen = useSelector((state) => state.createTemplate);
  const categoryList = useSelector((state) => state.filterCategory);
  const navigate = useNavigate();
  const [valueInputSubmitTemPlate, setValueInputSubmitTemplate] = React.useState({});
  const dispatch = useDispatch();


  const handleSetValueInput = async (data) => {
    await setValueInputSubmitTemplate({
      ...valueInputSubmitTemPlate,
      ...data,
    });
  };
  const handleSubmitTemplate = () => {
    const data = questionChosen?.map((item, index) => {
      return { questionId: item.id };
    });
    const payload = {
      ...valueInputSubmitTemPlate,
      questionBankTemplates: data,
      category: {
        id: questionChosen[0]?.category.id,
      },
    };
    questionTemplate
      .create(payload)
      .then((res) => {
        console.log("RES >>>", res);
      })
      .catch((error) => {});
    alert("Your Template has been created successfully");
    window.location.reload(false);
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
      />
    </div>
  );
};
