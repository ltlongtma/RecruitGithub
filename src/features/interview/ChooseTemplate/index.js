import * as React from "react";
import className from "classnames/bind";
import style from "./module.scss";
import { useDispatch } from "react-redux";
import { ApprovedTemplates } from "../../getTemplates/ExploreTemplates/Approved";
import { templatesFilterByAdmin } from "../../getTemplates/Slice";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { SearchForm } from "../../../components/SearchForm";

const cx = className.bind(style);

export default function ChooseTemplate({ activeStep, handleBack, handleNext, steps }) {
  const dispatch = useDispatch();

  const [paramStatus, setParamStatus] = React.useState({
    keyword: "",
    pageSize: 5,
    status: "APPROVED",
  });
  React.useEffect(() => {
    dispatch(templatesFilterByAdmin(paramStatus));
  }, [paramStatus]);
  const onPageChangeApprove = (page) => {
    const newParams = { ...paramStatus, page };
    dispatch(templatesFilterByAdmin(newParams));
  };
  const onChangePageSize = (e) => {
    setParamStatus({ ...paramStatus, pageSize: e });
  };
  const onValueSearch = (e) => {
    const newParams = { ...paramStatus, keyword: e };
    setParamStatus(newParams);
  };
  return (
    <>
      <div className={cx("template")}>
        <div className={cx("formSearch")}>
          <SearchForm onValueSearch={onValueSearch} />
        </div>
        <div>
          <ApprovedTemplates
            onPageChange={onPageChangeApprove}
            paramStatus={paramStatus}
            onChangePageSize={onChangePageSize}
            pageSize={paramStatus.pageSize}
          />
        </div>
      </div>
      <div>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 9, pb: 9 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </div>
    </>
  );
}
