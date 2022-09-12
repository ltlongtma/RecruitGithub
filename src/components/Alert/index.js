import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertSuccess({ title, openAlert, closeAlert }) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="success" sx={{ width: "100%" }}>
          {title}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
