import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import className from "classnames/bind";
import styles from "./module.scss";
import { PendingTemplates } from "../../features/getTemplates/ExploreTemplates/Pending";
import { useDispatch } from "react-redux";
import { FormFilterTemplates } from "../../features/getTemplates/FormFilter";
import { templatesFilterByAdmin } from "../../features/getTemplates/getTemplateListSlice";
import { ApprovedTemplates } from "../../features/getTemplates/ExploreTemplates/Approved";

const cx = className.bind(styles);
export const ExploreTemplates = () => {
  const [valueRoute, setValueRoute] = useState("1");
  const handleChange = (event, newValue) => {
    setValueRoute(newValue);
  };
  const [params, setParams] = useState({
    keyword: "",
    pageSize: 5,
    status: "",
  });

  const dispatch = useDispatch();

  const onValueSearch = (e) => {
    const newParams = { ...params, keyword: e };
    setParams(newParams);
    dispatch(templatesFilterByAdmin(newParams));
  };
  const pendingParams = { ...params, status: "PENDING" };
  const approvedParams = { ...params, status: "APPROVED" };

  const onPageChangePending = (page) => {
    const newParams = { ...pendingParams, page };
    dispatch(templatesFilterByAdmin(newParams));
  };
  const onPageChangeApprove = (page) => {
    const newParams = { ...approvedParams, page };
    dispatch(templatesFilterByAdmin(newParams));
  };
  return (
    <div>
      <Box>
        <TabContext value={valueRoute}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }} className={cx("BoxTabs")}>
            <TabList onChange={handleChange} aria-label="Explore">
              <Tab label="Approved" value="1" />
              <Tab label="Pending" value="2" />
            </TabList>
            <div className={cx("form-filter")}>
              <FormFilterTemplates onValueSearch={onValueSearch} />
            </div>
          </Box>
          <TabPanel value="1">
            <ApprovedTemplates onPageChange={onPageChangeApprove} params={approvedParams} />
          </TabPanel>
          <TabPanel value="2">
            <PendingTemplates onPageChange={onPageChangePending} params={pendingParams} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
