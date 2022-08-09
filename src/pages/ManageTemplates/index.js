import className from "classnames/bind";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";

import styles from "./template.module.scss";
import TabContext from "@mui/lab/TabContext";
import { Questionbank } from "../../features/getQuestionBank";

import { ShowQuestionChosen } from "./ShowQuestionChosen";
import questionBankApi from "../../services/questionBankApi";
import { getQuestionBank } from "../../features/getQuestionBank/getQuestionBankSlice";
import { getFilterCategory } from "../../features/getQuestionBank/FormFilter/getFilterCategorySlice";
import { ShowAllTemplate } from "./ShowAllTemplate";

const cx = className.bind(styles);

export const ManageTemplates = () => {
  const [valueRoute, setValueRoute] = React.useState("1");
  const dispatch = useDispatch();
  const questionChosen = useSelector((state) => state.createTemplate);
  // console.log("E >>>", questionChosen);
  const [valueInputSubmitTemPlate, setValueInputSubmitTemplate] = React.useState({
    category: {
      id: questionChosen[0]?.id,
      // name: "string",
    },
    description: "",
    name: "",
    public: true,
    questionBankTemplates: questionChosen,
  });

  React.useEffect(() => {
    questionBankApi
      .getAll()

      .then((res) => {
        dispatch(getQuestionBank(res));
      })
      .catch((error) => {
        console.log("ERROR getQuestionBank >>> " + error);
      });
    questionBankApi
      .getFilterCategory()
      .then((res) => {
        dispatch(getFilterCategory(res));
      })
      .catch((error) => {
        console.log("ERROR getFilterCategory >>> " + error);
      });
  }, [valueInputSubmitTemPlate]);
  const handleChange = (event, newValue) => {
    setValueRoute(newValue);
  };
  const handleSetValueInput = async (data) => {
    // console.log("DATA InPut", data);
    await setValueInputSubmitTemplate({
      ...valueInputSubmitTemPlate,
      ...data,
    });
  };
  const handleSubmitTemplate = () => {
    console.log("DATA InPut", valueInputSubmitTemPlate);
  };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={valueRoute}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Explore templates" value="1" />
              <Tab label="New templates" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ShowAllTemplate></ShowAllTemplate>
          </TabPanel>
          <TabPanel value="2">
            <Questionbank
              hiddenCreateButton={true}
              hiddenSelectStatusQuestion={true}
              showSelectColumn={true}
            />

            <Box sx={{ borderBottom: 3, borderColor: "block", m: 5 }}></Box>

            <ShowQuestionChosen
              QuestionChosen={questionChosen}
              dataTemplate={(data) => handleSetValueInput(data)}
              handleSubmitTemplate={handleSubmitTemplate}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
