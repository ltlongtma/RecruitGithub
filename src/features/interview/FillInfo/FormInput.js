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
import dayjs from "dayjs";
import { ModalConfirm } from "../../../components/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { editPendingCandidate, saveCandidate } from "./Slice";
import { useDispatch } from "react-redux";
import AlertSuccess from "../../../components/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as yup from "yup";

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
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const dispatch = useDispatch();

  const [defaultValueInput, setDefaultValueInput] = useState({
    candidate: {
      name: "",
      birthday: dayjs(),
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

    interviewDate: dayjs(),
  });

  useEffect(() => {
    if (dataFromPendingCandidate?.id) {
      setDefaultValueInput({
        ...dataFromPendingCandidate,
      });
    }
  }, [dataFromPendingCandidate]);
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      setShowModal(!showModal);
    }
    if (Object.keys(formErrors).length === 0 && isValidated) {
      handleNext();
    }
  }, [formErrors]);
  const handleChangeDateOfBirth = (value) => {
    const newValue = {
      ...defaultValueInput,
      candidate: {
        ...defaultValueInput.candidate,
        birthday: value,
      },
    };
    setDefaultValueInput({
      ...newValue,
    });
  };
  const handleChangeDateOfInterview = (value) => {
    const newValue = {
      ...defaultValueInput,
      interviewDate: value,
    };
    setDefaultValueInput({
      ...newValue,
    });
  };

  const handleSaveButton = (e) => {
    e.preventDefault();

    setFormErrors(validate(defaultValueInput));
    setIsSubmitting(true);
  };
  const handleNextWithValidate = () => {
    setFormErrors(validate(defaultValueInput));
    setIsValidated(true);
  };

  const handleSaveForm = () => {
    const id = dataFromPendingCandidate?.id;
    if (id) {
      dispatch(editPendingCandidate({ ...defaultValueInput, id }));
      handleCloseModal();
      setOpenAlert(true);
    } else {
      dispatch(saveCandidate(defaultValueInput));
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
  const handleChangeValueGeneral = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newValue = {
      ...defaultValueInput,
      candidate: {
        ...defaultValueInput?.candidate,
        [name]: value,
      },
    };
    setDefaultValueInput({
      ...newValue,
    });
  };

  const handleChangeInterviewer1 = (e) => {
    const valueInterviewer = e.target.innerText;
    const newValue = {
      ...defaultValueInput,
      assessments: [
        {
          ...defaultValueInput.assessments[0],
          interviewer: {
            username: valueInterviewer,
          },
        },
        {
          ...defaultValueInput?.assessments[1],
        },
      ],
    };
    setDefaultValueInput({
      ...newValue,
    });
  };
  const handleChangeInterviewer2 = (e) => {
    const valueInterviewer = e.target.innerText;
    const newValue = {
      ...defaultValueInput,
      assessments: [
        {
          ...defaultValueInput.assessments[0],
        },
        {
          ...defaultValueInput.assessments[1],
          interviewer: {
            username: valueInterviewer,
          },
        },
      ],
    };
    setDefaultValueInput({
      ...newValue,
    });
  };
  const validate = (values) => {
    let errors = {};

    if (!values.candidate.name.length) {
      errors.name = "Can not be blank!";
    } else if (values.candidate.name.length < 3) {
      errors.name = "Invalid input";
    }
    if (values.candidate.educationStatus.length < 1) {
      errors.educationStatus = "Invalid input!";
    }
    if (values.candidate.position.length < 1) {
      errors.position = "Invalid input!";
    }
    if (!values.assessments[0].interviewer.username.length) {
      errors.interviewer1 = "Invalid input!";
    }

    return errors;
  };
  return (
    <div>
      <form>
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
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={defaultValueInput?.candidate?.name}
                  onChange={handleChangeValueGeneral}
                />
                {formErrors.name && <span className="text-error">{formErrors.name}</span>}
              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DatePicker
                      label="Date of Birth"
                      inputFormat="DD/MM/YYYY"
                      disableFuture
                      name="birthday"
                      defaultDate={defaultValueInput?.candidate?.birthday}
                      renderInput={(params) => <TextField {...params} />}
                      value={defaultValueInput?.candidate?.birthday}
                      onChange={handleChangeDateOfBirth}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    labelId="gender"
                    name="gender"
                    id="gender"
                    label="gender"
                    defaultValue={defaultValueInput?.candidate?.gender || "MALE"}
                    key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                    onChange={handleChangeValueGeneral}
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
                  name="phone"
                  variant="outlined"
                  fullWidth
                  onChange={handleChangeValueGeneral}
                  value={defaultValueInput?.candidate?.phone}
                />
              </Grid>
            </Grid>

            <Grid container spacing={7} sx={{ p: 4 }}>
              <Grid item xs={3}>
                <TextField
                  id="educationStatus"
                  label="Graduate"
                  variant="outlined"
                  name="educationStatus"
                  fullWidth
                  value={defaultValueInput?.candidate?.educationStatus}
                  onChange={handleChangeValueGeneral}
                />
                {formErrors.educationStatus && (
                  <span className="text-error">{formErrors.educationStatus}</span>
                )}
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="gpa"
                  label="GPA"
                  variant="outlined"
                  fullWidth
                  name="gpa"
                  onChange={handleChangeValueGeneral}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="position"
                  label="Position"
                  name="position"
                  variant="outlined"
                  fullWidth
                  onChange={handleChangeValueGeneral}
                  value={defaultValueInput?.candidate?.position}
                />
                {formErrors.position && <span className="text-error">{formErrors.position}</span>}
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="workMode">Mode</InputLabel>
                  <Select
                    labelId="workMode"
                    id="workMode"
                    name="workMode"
                    label="workMode"
                    onChange={handleChangeValueGeneral}
                    value={defaultValueInput?.candidate?.workMode || "FULL_TIME"}
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
                  id="interviewer1"
                  name="interviewer1"
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  options={userListSuggest}
                  renderInput={(params) => <TextField {...params} label="Interview 1" />}
                  onChange={handleChangeInterviewer1}
                  value={defaultValueInput?.assessments[0]?.interviewer.username}
                />
                {formErrors.interviewer1 && (
                  <span className="text-error">{formErrors.interviewer1}</span>
                )}
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="interviewer2"
                  name="interviewer2"
                  options={userListSuggest}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  renderInput={(params) => <TextField {...params} label="Interview 2" />}
                  onChange={handleChangeInterviewer2}
                  value={defaultValueInput?.assessments[1]?.interviewer?.username}
                />
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack>
                    <DatePicker
                      label="Date of Interview"
                      name="interviewDate"
                      inputFormat="DD/MM/YYYY"
                      defaultValue={defaultValueInput?.interviewDate}
                      renderInput={(params) => <TextField {...params} />}
                      value={defaultValueInput?.interviewDate}
                      onChange={handleChangeDateOfInterview}
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

              <Button onClick={handleSaveButton} color="warning">
                Save
              </Button>
              <Button onClick={handleNextWithValidate}>
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
