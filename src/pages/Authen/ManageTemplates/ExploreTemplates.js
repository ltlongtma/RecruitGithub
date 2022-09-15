import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import className from "classnames/bind";
import styles from "./module.scss";
import { PendingTemplates } from "../../../features/getTemplates/ExploreTemplates/Pending";
import { useDispatch } from "react-redux";
import { FormFilterTemplates } from "../../../features/getTemplates/FormFilter";
import { templatesFilterByAdmin } from "../../../features/getTemplates/Slice";
import { ApprovedTemplates } from "../../../features/getTemplates/ExploreTemplates/Approved";

const cx = className.bind(styles);
export const ExploreTemplates = () => {
  const [valueRoute, setValueRoute] = useState("1");
  const handleChange = (event, newValue) => {
    setValueRoute(newValue);
  };
  const dispatch = useDispatch();

  const [paramStatus, setParamStatus] = useState({
    keyword: "",
    pageSize: 5,
    status: "",
  });

  const onValueSearch = (e) => {
    if (valueRoute == 1) {
      const newParams = { ...paramStatus, keyword: e, status: "APPROVED" };
      setParamStatus(newParams);
      dispatch(templatesFilterByAdmin(newParams));
    } else {
      const newParams = { ...paramStatus, keyword: e, status: "PENDING" };
      setParamStatus(newParams);
      dispatch(templatesFilterByAdmin(newParams));
    }
  };
  const pendingParams = { ...paramStatus, status: "PENDING" };
  const approvedParams = { ...paramStatus, status: "APPROVED" };

  const onPageChangePending = (page) => {
    const newParams = { ...pendingParams, page };
    dispatch(templatesFilterByAdmin(newParams));
  };
  const onPageChangeApprove = (page) => {
    const newParams = { ...approvedParams, page };
    dispatch(templatesFilterByAdmin(newParams));
  };
  const onChangePageSize = async (e) => {
    if (valueRoute == 1) {
      const newParams = { ...approvedParams, pageSize: e };
      setParamStatus({ ...approvedParams, pageSize: e });
      dispatch(templatesFilterByAdmin(newParams));
    } else if (valueRoute == 2) {
      const newParams = { ...pendingParams, pageSize: e };
      setParamStatus({ ...pendingParams, pageSize: e });

      dispatch(templatesFilterByAdmin(newParams));
    }
  };
  return (
    <div>
      <Box>
        <TabContext value={valueRoute}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }} className={cx("BoxTabs")}>
            <TabList
              onChange={handleChange}
              aria-label="Explore"
              textColor="secondary"
              indicatorColor="secondary"
              
            >
              <Tab label="Approved" value="1" />
              <Tab label="Pending" value="2" />
            </TabList>
            <div className={cx("form-filter")}>
              <FormFilterTemplates onValueSearch={onValueSearch} />
            </div>
          </Box>
          <TabPanel value="1">
            <ApprovedTemplates
              onPageChange={onPageChangeApprove}
              paramStatus={approvedParams}
              onChangePageSize={onChangePageSize}
            />
          </TabPanel>
          <TabPanel value="2">
            <PendingTemplates
              onPageChange={onPageChangePending}
              paramStatus={pendingParams}
              onChangePageSize={onChangePageSize}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
