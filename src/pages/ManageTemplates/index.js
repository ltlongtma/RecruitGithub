import className from "classnames/bind";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { MyTemplates } from "./MyTemplates";
import { NewTemplate } from "./NewTemplate";
import { ExploreTemplates } from "./ExploreTemplates";
import { useDispatch } from "react-redux";
import {
  addQuestionToTemplate,
  clearQuestionFromTemplate,
} from "../../features/getTemplates/Slice";

export const ManageTemplates = () => {
  const [valueRoute, setValueRoute] = React.useState("1");
  const [defaultValue, setDefaultValue] = React.useState({});
  const [textOnTabs, setTextOnTabs] = React.useState("New Templates");
  const [hiddenSaveButton, setHiddenSaveButton] = React.useState(true);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValueRoute(newValue);
  };
  const handleEditTemplate = (data) => {
    setDefaultValue(data);
    setTextOnTabs("Edit Template");
    setValueRoute("2");
    dispatch(clearQuestionFromTemplate());
    data.questionBankTemplates.map((item) => {
      dispatch(addQuestionToTemplate(item.question));
    });
    setHiddenSaveButton(false);
  };
  const handleCancerButton = () => {
    setTextOnTabs("New Templates");
    setValueRoute("1");
    dispatch(clearQuestionFromTemplate());
    setDefaultValue({});
  };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={valueRoute}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Explore templates" value="1" />
              <Tab label={textOnTabs} value="2" />
              <Tab label="My templates" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ExploreTemplates />
          </TabPanel>
          <TabPanel value="2">
            <NewTemplate
              defaultValue={defaultValue}
              hiddenSaveButton={hiddenSaveButton}
              handleCancerButton={handleCancerButton}
            />
          </TabPanel>
          <TabPanel value="3">
            <MyTemplates handleEditTemplate={handleEditTemplate} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
