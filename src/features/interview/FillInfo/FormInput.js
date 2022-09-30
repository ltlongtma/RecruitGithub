import { ErrorMessage } from "@hookform/error-message";
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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import className from "classnames/bind";
import style from "./module.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ModalConfirm } from "../../../components/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { saveCandidate } from "./Slice";
import { useDispatch } from "react-redux";
import AlertSuccess from "../../../components/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { keys } from "@material-ui/core/styles/createBreakpoints";

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
          name: null,
        },
      },
      {
        interviewer: {
          name: null,
        },
      },
    ],
    dateOfInterview: dayjs(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm({});
  useEffect(() => {
    if (dataFromPendingCandidate.id) {
      setDefaultValueInput({
        candidate: {
          name: dataFromPendingCandidate?.candidate?.name,
          birthday: dataFromPendingCandidate?.candidate?.birthday,
          gender: dataFromPendingCandidate?.candidate?.gender,
          phone: dataFromPendingCandidate?.candidate?.phone,
          educationStatus: dataFromPendingCandidate?.candidate?.educationStatus,
          gpa: dataFromPendingCandidate?.candidate?.gpa,
          position: dataFromPendingCandidate?.candidate?.position,
          workMode: dataFromPendingCandidate?.candidate?.workMode,
        },

        assessments: [
          {
            interviewer: {
              name: dataFromPendingCandidate?.assessments[0]?.interviewer?.name,
            },
          },
          {
            interviewer: {} || null,
          },
        ],

        dateOfInterview: dataFromPendingCandidate?.interviewDate,
      });
    }
  }, [dataFromPendingCandidate]);
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
      dateOfInterview: value,
    };
    setDefaultValueInput({
      ...newValue,
    });
  };

  const handleSaveButton = () => {
    setShowModal(!showModal);
  };

  const handleSaveForm = async () => {
    // console.log("defaultValueInput >>>", defaultValueInput);
    await dispatch(saveCandidate(defaultValueInput));
    handleCloseModal();
    handleBack();
    setOpenAlert(true);
  };
  const handleCloseModal = () => {
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
        ...defaultValueInput.candidate,
        [name]: value,
      },
    };
    setDefaultValueInput({
      ...newValue,
    });
    // console.log("WWW >>>", dataInput);
  };

  const handleChangeInterviewer1 = (e) => {
    const valueInterviewer = e.target.innerText;
    const newValue = {
      ...defaultValueInput,
      assessments: [
        {
          interviewer: {
            name: valueInterviewer,
          },
        },
        {
          interviewer: {
            name: defaultValueInput?.assessments[1]?.interviewer?.name,
          },
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
          interviewer: {
            name: defaultValueInput?.assessments[0]?.interviewer?.name,
          },
        },
        {
          interviewer: {
            name: valueInterviewer,
          },
        },
      ],
    };
    setDefaultValueInput({
      ...newValue,
    });
  };

  return (
    <div>
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
                name="name"
                label="Name"
                variant="outlined"
                onChange={handleChangeValueGeneral}
                value={defaultValueInput?.candidate?.name}
                // defaultValue={defaultValueInput?.candidate?.name}
                // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                // {...register("name", {
                //   required: "Invalid input",
                //   minLength: {
                //     value: 3,
                //     message: "Invalid input",
                //   },
                // })}
              />

              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <p className={cx("text-error")}>{message}</p>}
              />
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DatePicker
                    label="Date of Birth"
                    inputFormat="DD/MM/YYYY"
                    disableFuture
                    name="birthday"
                    value={defaultValueInput?.candidate?.birthday}
                    onChange={handleChangeDateOfBirth}
                    defaultDate={defaultValueInput?.candidate?.birthday}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <ErrorMessage
                errors={errors}
                name="birthday"
                render={({ message }) => <p className={cx("text-error")}>{message}</p>}
              />
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
                  onChange={handleChangeValueGeneral}
                  key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
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
                onChange={handleChangeValueGeneral}
                value={defaultValueInput?.candidate?.phone}
                // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                fullWidth
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
                value={defaultValueInput?.candidate?.educationStatus}
                onChange={handleChangeValueGeneral}
                fullWidth
                // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}

                // {...register("educationStatus", {
                //   required: "Invalid input",
                //   minLength: {
                //     value: 3,
                //     message: "Invalid input",
                //   },
                // })}
              />
              <ErrorMessage
                errors={errors}
                name="educationStatus"
                render={({ message }) => <p className={cx("text-error")}>{message}</p>}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="gpa"
                label="GPA"
                variant="outlined"
                fullWidth
                {...register("gpa")}
                name="gpa"
                onChange={handleChangeValueGeneral}
                // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="position"
                label="Position"
                name="position"
                onChange={handleChangeValueGeneral}
                variant="outlined"
                fullWidth
                value={defaultValueInput?.candidate?.position}
                // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                // required
                // {...register("position", {
                //   required: "Invalid input",
                //   minLength: {
                //     value: 3,
                //     message: "Invalid input",
                //   },
                // })}
              />
              <ErrorMessage
                errors={errors}
                name="position"
                render={({ message }) => <p className={cx("text-error")}>{message}</p>}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="workMode">Mode</InputLabel>
                <Select
                  labelId="workMode"
                  id="workMode"
                  name="workMode"
                  onChange={handleChangeValueGeneral}
                  label="workMode"
                  value={defaultValueInput?.candidate?.workMode || "FULL_TIME"}
                  // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}

                  // {...register("workMode")}
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
                label="Interview 1"
                onChange={handleChangeInterviewer1}
                // value={interview1}
                value={defaultValueInput?.assessments[0]?.interviewer.name || null}
                // value={defaultValueInput?.interviewer1}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                options={userListSuggest}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Interview 1"

                    // {...register("interviewer1", {
                    //   required: "Invalid input",
                    // })}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="interviewer1"
                render={({ message }) => <p className={cx("text-error")}>{message}</p>}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                id="interviewer2"
                name="interviewer2"
                options={userListSuggest}
                value={defaultValueInput?.assessments[1]?.interviewer?.name || null}
                onChange={handleChangeInterviewer2}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderInput={(params) => <TextField {...params} label="Interview 2" />}
                // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack>
                  <DatePicker
                    label="Date of Interview"
                    name="dateOfInterview"
                    inputFormat="DD/MM/YYYY"
                    // defaultValue={defaultValueInput?.dateOfInterview}
                    value={defaultValueInput?.dateOfInterview}
                    onChange={handleChangeDateOfInterview}
                    renderInput={(params) => (
                      <TextField {...params} {...register("interviewDate")} />
                    )}
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

            <Button onClick={handleSubmit(handleSaveButton)} color="warning">
              Save
            </Button>
            <Button onClick={handleSubmit(handleNext)}>
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
    </div>
  );
};
