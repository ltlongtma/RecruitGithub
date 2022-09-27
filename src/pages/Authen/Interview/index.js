import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FillInfo from "../../../features/interview/FillInfo";
import { ColorlibConnector, ColorlibStepIcon } from "./Stepper";
import { useState } from "react";
import Interview from "../../../features/interview/Interview";
import TotalResult from "../../../features/interview/TotalResult";
import styles from "../../../pages/Authen/User/user.module.scss";
import className from "classnames/bind";
import { Breadcrumb } from "../../../components/Breadcrumb";
import ChooseTemplate from "../../../features/interview/ChooseTemplate";

const cx = className.bind(styles);

const steps = ["General information", "Choose Template", "Interview", "Total result"];

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

  return (
    <>
      <Breadcrumb firstTitle={"Home"} secondTitle={"Interview"} href={"/question"} />
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
            <ChooseTemplate
              steps={steps}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          ) : activeStep === 2 ? (
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
      </Box>
    </>
  );
};
