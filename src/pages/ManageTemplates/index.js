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
import questionBankApi from "../../services/questionBankApi";
import { useDispatch } from "react-redux";
import { getFilterCategory } from "../../features/getQuestionBank/FormFilter/getFilterCategorySlice";

export const ManageTemplates = () => {
  const [valueRoute, setValueRoute] = React.useState("1");
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValueRoute(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={valueRoute}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Explore templates" value="1" />
              <Tab label="New templates" value="2" />
              <Tab label="My templates" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ExploreTemplates />
          </TabPanel>
          <TabPanel value="2">
            <NewTemplate />
          </TabPanel>
          <TabPanel value="3">
            <MyTemplates />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
