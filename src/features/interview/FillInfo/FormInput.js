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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import className from "classnames/bind";
import style from "./module.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ModalConfirm } from "../../../components/Modal";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { saveCandidate } from "./Slice";
import { useDispatch } from "react-redux";
import AlertSuccess from "../../../components/Alert";

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
  const [dateOfbirth, setDateOfBirth] = React.useState();
  const [dateOfInterview, setDateOfInterview] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: "onBlur",
  });
  // const {
  //   field: { onChange, onBlur, name, value, ref },
  //   fieldState: { invalid, isTouched, isDirty },
  //   formState: { touchedFields, dirtyFields }
  // } = useController({
  //   name,
  //   control,
  //   rules: { required: true },
  //   defaultValue: "",
  // });
  const name = React.useRef({});
  name.current = watch("name");
  const gender = React.useRef({});
  gender.current = watch("gender");
  const phone = React.useRef({});
  phone.current = watch("phone");
  const educationStatus = React.useRef({});
  educationStatus.current = watch("educationStatus");
  const gpa = React.useRef({});
  gpa.current = watch("gpa");
  const position = React.useRef({});
  position.current = watch("position");
  const workMode = React.useRef({});
  workMode.current = watch("workMode");
  const interviewer1 = React.useRef({});
  interviewer1.current = watch("interviewer1");
  const interviewer2 = React.useRef({});
  interviewer2.current = watch("interviewer2");

  const dataInput = {
    candidate: {
      birthday: moment(dateOfbirth),
      educationStatus: educationStatus.current,
      gender: gender.current,
      gpa: gpa.current,
      id: 0,
      name: name.current,
      phone: phone.current,
      position: position.current,
    },
    interviewDate: moment(dateOfInterview),
    interviewer1: interviewer1.current,
    interviewer2: interviewer2?.current?.length > 0 ? interviewer2.current : null,
    workMode: workMode.current,
  };
  const defaultValues = {
    name: dataFromPendingCandidate?.candidate?.name,
    birthday: dataFromPendingCandidate?.candidate?.birthday,
    gender: dataFromPendingCandidate?.candidate?.gender || "MALE",
    phone: dataFromPendingCandidate?.candidate?.phone,
    educationStatus: dataFromPendingCandidate?.candidate?.educationStatus,
    gpa: dataFromPendingCandidate?.candidate?.gpa,
    position: dataFromPendingCandidate?.candidate?.position,
    workMode: dataFromPendingCandidate?.workMode || "FULL_TIME",
    interviewer1: dataFromPendingCandidate?.interviewer1?.name,
    interviewer2: dataFromPendingCandidate?.interviewer2?.name,
    dateOfInterview: dataFromPendingCandidate?.interviewDate,
  };
  useEffect(() => {
    reset({
      ...defaultValues,
    });
  }, [dataFromPendingCandidate]);
  console.log("E >>>", dataFromPendingCandidate);
  const handleChangeDateOfBirth = (value) => {
    setDateOfBirth(value.format());
  };
  const handleChangeDateOfInterview = (value) => {
    setDateOfInterview(value.format());
  };

  const handleSaveButton = () => {
    setShowModal(!showModal);
  };

  const handleSaveForm = async () => {
    await dispatch(saveCandidate(dataInput));
    setShowModal(false);
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

  return (
    <div>
      <Box sx={{ p: 5 }} hidden={hiddenFormInput}>
        <Grid container sx={{ mt: 5 }}>
          <Typography variant="overline" className={cx("typography")}>
            Candidate information
          </Typography>
          <Grid container spacing={7} sx={{ p: 4 }}>
            <Grid item xs={3}>
              {/* <Controller
                control={control}
                name="name"
                defaultValue={defaultValues?.name}
                render={({ field}) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    variant="outlined"
                    onChange={(e)=>field.onChange(e.target.value)}
                    {...register("name", {
                      required: "Invalid input",
                      minLength: {
                        value: 3,
                        message: "Invalid input",
                      },
                    })}
                  />
                )}
              /> */}
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                defaultValue={defaultValues?.name}
                {...register("name", {
                  required: "Invalid input",
                  minLength: {
                    value: 3,
                    message: "Invalid input",
                  },
                })}
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
                  <DesktopDatePicker
                    label="Date of Birth"
                    inputFormat="DD/MM/YYYY"
                    defaultCalendarMonth={defaultValues?.birthday}
                    value={dateOfbirth}
                    disableFuture
                    onChange={handleChangeDateOfBirth}
                    renderInput={(params) => (
                      <TextField {...params} id="birthday" {...register("birthday")} />
                    )}
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
                  id="gender"
                  label="gender"
                  defaultValue={defaultValues?.gender}
                  {...register("gender")}
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
                variant="outlined"
                defaultValue={defaultValues?.phone}
                fullWidth
                {...register("phone")}
              />
            </Grid>
          </Grid>

          <Grid container spacing={7} sx={{ p: 4 }}>
            <Grid item xs={3}>
              <TextField
                id="educationStatus"
                label="Graduate"
                variant="outlined"
                defaultValue={defaultValues?.educationStatus}
                fullWidth
                required
                {...register("educationStatus", {
                  required: "Invalid input",
                  minLength: {
                    value: 3,
                    message: "Invalid input",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="educationStatus"
                render={({ message }) => <p className={cx("text-error")}>{message}</p>}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField id="gpa" label="GPA" variant="outlined" fullWidth {...register("gpa")} />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="position"
                label="Position"
                variant="outlined"
                fullWidth
                defaultValue={defaultValues?.position}
                required
                {...register("position", {
                  required: "Invalid input",
                  minLength: {
                    value: 3,
                    message: "Invalid input",
                  },
                })}
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
                  label="workMode"
                  defaultValue={defaultValues?.workMode}
                  {...register("workMode")}
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
                defaultValue={defaultValues?.interviewer1}
                options={userListSuggest}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Interview 1"
                    {...register("interviewer1", {
                      required: "Invalid input",

                      // validate: (value) => userListSuggest.indexOf(value) >= 0,
                    })}
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
                options={userListSuggest}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    defaultValue={defaultValues?.interviewer2}
                    label="Interview 2"
                    {...register("interviewer2")}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack>
                  <DesktopDatePicker
                    label="Date of Interview"
                    inputFormat="DD/MM/YYYY"
                    defaultValue={defaultValues?.dateOfInterview}
                    value={dateOfInterview}
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
