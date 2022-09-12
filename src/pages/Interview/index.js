import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FillInfo from "../../features/interview/FillInfo";
import { ColorlibConnector, ColorlibStepIcon } from "./Stepper";
import { useState } from "react";
import Interview from "../../features/interview/Interview";
import TotalResult from "../../features/interview/TotalResult";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styles from "../../pages/User/user.module.scss";

import className from "classnames/bind";

const cx = className.bind(styles);

const steps = ["General information", "Interview", "Total result"];

export const InterviewProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/question">
      Home
    </Link>,
    <Typography key="2">Interview</Typography>,
  ];
  return (
    <>
      <div className={cx("question-bank-breadcrumb")}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <Box sx={({ width: "100%" }, { mt: 5 })}>
        <div>
          <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div>
          {activeStep === 0 ? (
            <FillInfo
              steps={steps}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          ) : activeStep === 1 ? (
            <Interview
              steps={steps}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          ) : activeStep === steps.length ? (
            <div>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </div>
          ) : (
            <TotalResult
              steps={steps}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
        </div>
        {/* <div>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </div> */}
      </Box>
    </>
  );
};
