import * as React from "react";
import Box from "@mui/material/Box";
import { Questionbank } from "../../features/getQuestionBank";
import { ShowQuestionChosen } from "../../components/ShowQuestionChosenToTemPlate/index.js";
import questionTemplate from "../../services/questionTemplates";
import { useDispatch, useSelector } from "react-redux";
import questionBankApi from "../../services/questionBankApi";
import { getFilterCategory } from "../../features/getQuestionBank/FormFilter/getFilterCategorySlice";

export const NewTemplate = () => {
  const questionChosen = useSelector((state) => state.createTemplate);
  const CategoryList = useSelector((state) => state.filterCategory);

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
  React.useEffect(() => {
    questionBankApi
      .getFilterCategory()
      .then((res) => {
        dispatch(getFilterCategory(res));
      })
      .catch((error) => {
        console.log("ERROR getFilterCategory >>> " + error);
      });
  }, []);
  return (
    <div>
      <Questionbank
        hiddenCreateButton={true}
        hiddenSelectStatusQuestion={true}
        showSelectColumn={true}
        onFilterCategory={CategoryList}
        navigateWithState={true}
      />

      <Box sx={{ borderBottom: 3, borderColor: "block", m: 5 }}></Box>

      <ShowQuestionChosen
        QuestionChosen={questionChosen}
        dataTemplate={(data) => handleSetValueInput(data)}
        handleSubmitTemplate={handleSubmitTemplate}
        onFilterCategory={CategoryList}
      />
    </div>
  );
};
