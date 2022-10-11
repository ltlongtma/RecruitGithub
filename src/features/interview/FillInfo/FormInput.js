import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import style from "./module.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ModalConfirm } from "../../../components/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { editPendingCandidate, saveCandidate } from "./Slice";
import { useDispatch } from "react-redux";
import AlertSuccess from "../../../components/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik, getIn } from "formik";
import * as Yup from "yup";

const cx = className.bind(style);

export const FormInput = ({
  hiddenFormInput,
  userListSuggest,
  activeStep,
  handleNext,
  steps,
  handleBack,
  dataFromPendingCandidate,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitializer: true,
    initialValues: {
      candidate: {
        name: "",
        birthday: new Date(),
        gender: "MALE",
        phone: "",
        educationStatus: "",
        gpa: "",
        position: "",
        workMode: "FULL_TIME",
      },
      assessments: [
        {
          interviewer: {
            username: "",
          },
        },
        {
          interviewer: {
            username: "",
          },
        },
      ],

      interviewDate: new Date(),
    },
    validationSchema: Yup.object().shape({
      candidate: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        educationStatus: Yup.string().required("This field is required"),
        position: Yup.string().required("This field is required"),
      }),
      assessments: Yup.array().of(
        Yup.object().shape({
          interviewer: Yup.object().shape({
            username: Yup.string().required("This field is required"),
          }),
          interviewer: Yup.object().shape({
            username: Yup.string(),
          }),
        })
      ),
    }),
    onSubmit: async (values) => {
      console.log("E >>>", values);
    },
  });
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
    setValues,
  } = formik;
  // console.log("E >>>", values);
  useEffect(() => {
    if (dataFromPendingCandidate?.id) {
      setValues({
        ...dataFromPendingCandidate,
      });
    }
  }, [dataFromPendingCandidate]);
  const handleSaveForm = () => {
    const id = dataFromPendingCandidate?.id;
    if (id) {
      dispatch(editPendingCandidate({ ...values, id }));
      handleCloseModal();
      setOpenAlert(true);
    } else {
      dispatch(saveCandidate(values));
      handleCloseModal();
      handleBack();
      setOpenAlert(true);
    }
  };
  const handleCloseModal = (e) => {
    setShowModal(!showModal);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ p: 5 }} hidden={hiddenFormInput}>
          <Grid container sx={{ mt: 5 }}>
            <Typography variant="overline" className={cx("typography")}>
              Candidate information
            </Typography>
            <Grid container spacing={7} sx={{ p: 4 }}>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  name="candidate.name"
                  label="Name"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.candidate.name}
                  helperText={getIn(touched, "candidate.name") && getIn(errors, "candidate.name")}
                  error={Boolean(
                    getIn(touched, "candidate.name") && getIn(errors, "candidate.name")
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DatePicker
                      label="Date of Birth"
                      inputFormat="DD/MM/YYYY"
                      disableFuture
                      id="candidate.birthday"
                      name="candidate.birthday"
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(val) => setFieldValue("candidate.birthday", val)}
                      value={values.candidate.birthday}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    labelId="gender"
                    name="candidate.gender"
                    id="gender"
                    label="gender"
                    key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.candidate.gender}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="phone"
                  label="Phone"
                  name="candidate.phone"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.candidate.phone}
                />
              </Grid>
            </Grid>

            <Grid container spacing={7} sx={{ p: 4 }}>
              <Grid item xs={3}>
                <TextField
                  id="educationStatus"
                  label="Graduate"
                  variant="outlined"
                  name="candidate.educationStatus"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.candidate.educationStatus}
                  helperText={
                    getIn(touched, "candidate.educationStatus") &&
                    getIn(errors, "candidate.educationStatus")
                  }
                  error={Boolean(
                    getIn(touched, "candidate.educationStatus") &&
                      getIn(errors, "candidate.educationStatus")
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="gpa"
                  label="GPA"
                  variant="outlined"
                  fullWidth
                  name="candidate.gpa"
                  onChange={handleChange}
                  value={values.candidate.gpa}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="position"
                  label="Position"
                  name="candidate.position"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.candidate.position}
                  helperText={
                    getIn(touched, "candidate.position") && getIn(errors, "candidate.position")
                  }
                  error={Boolean(
                    getIn(touched, "candidate.position") && getIn(errors, "candidate.position")
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="workMode">Mode</InputLabel>
                  <Select
                    labelId="workMode"
                    id="workMode"
                    name="candidate.workMode"
                    label="workMode"
                    onChange={handleChange}
                    value={values.candidate.workMode || "FULL_TIME"}
                  >
                    <MenuItem value="PART_TIME_INTERNSHIP">PART_TIME_INTERNSHIP</MenuItem>
                    <MenuItem value="FULL_TIME_INTERNSHIP">FULL_TIME_INTERNSHIP</MenuItem>
                    <MenuItem value="CONTRACTOR">CONTRACTOR</MenuItem>
                    <MenuItem value="FULL_TIME">FULL TIME</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 11 }}>
            <Typography variant="overline" className={cx("typography")}>
              Others information
            </Typography>
            <Grid container spacing={7} sx={{ p: 4 }}>
              <Grid item xs={4}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  options={userListSuggest}
                  id="assessments[0].interviewer.username"
                  name="assessments[0].interviewer.username"
                  onChange={(e, value) =>
                    setFieldValue("assessments[0].interviewer.username", value)
                  }
                  value={values.assessments[0].interviewer.username}
                  onBlur={handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="assessments[0].interviewer.username"
                      name="assessments[0].interviewer.username"
                      label="Interview 1"
                      helperText={
                        getIn(touched, "assessments[0].interviewer.username") &&
                        getIn(errors, "assessments[0].interviewer.username")
                      }
                      error={Boolean(
                        getIn(touched, "assessments[0].interviewer.username") &&
                          getIn(errors, "assessments[0].interviewer.username")
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="assessments[1].interviewer.username"
                  options={userListSuggest}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="assessments[1]?.interviewer.username"
                      label="Interview 2"
                    />
                  )}
                  onChange={(e, value) =>
                    setFieldValue("assessments[1].interviewer.username", value)
                  }
                  value={values.assessments[1]?.interviewer.username}
                />
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack>
                    <DatePicker
                      label="Date of Interview"
                      name="interviewDate"
                      inputFormat="DD/MM/YYYY"
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(val) => setFieldValue("interviewDate", val)}
                      value={values.interviewDate}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 9, pb: 9 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button type="submit" color="warning">
                Save
              </Button>
              <Button onClick={() => alert(" E >>>", formik.values)}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </div>
        </Box>
        <ModalConfirm
          centered
          title={`SAVE INFORMATION`}
          content={`Are you sure to save this general information?`}
          show={showModal}
          onHide={handleCloseModal}
          handleNoModal={handleCloseModal}
          handleYesModal={handleSaveForm}
        />
        <AlertSuccess
          title="Candidate's information was saved successfully"
          openAlert={openAlert}
          closeAlert={handleCloseAlert}
        />
      </form>
    </div>
  );
};
