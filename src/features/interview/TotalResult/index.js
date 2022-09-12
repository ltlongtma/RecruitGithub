import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function TotalResult({ activeStep, handleBack, handleNext, steps }) {
  return (
    <Box sx={{ p: 5 }}>
      <h1>Total result</h1>
      <div>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 9 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </div>
    </Box>
  );
}
