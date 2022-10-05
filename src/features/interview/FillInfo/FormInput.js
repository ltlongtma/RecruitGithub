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
          username: null,
        },
      },
      {
        interviewer: {
          username: null,
        },
      },
    ],

    interviewDate: dayjs(),
  });

  useEffect(() => {
    if (dataFromPendingCandidate.id) {
      setDefaultValueInput({
        ...defaultValueInput,
        candidate: {
          // name: dataFromPendingCandidate?.candidate?.name,
          birthday: dataFromPendingCandidate?.candidate?.birthday,
          gender: dataFromPendingCandidate?.candidate?.gender,
          phone: dataFromPendingCandidate?.candidate?.phone,
          // educationStatus: dataFromPendingCandidate?.candidate?.educationStatus,
          gpa: dataFromPendingCandidate?.candidate?.gpa,
          // position: dataFromPendingCandidate?.candidate?.position,
          workMode: dataFromPendingCandidate?.candidate?.workMode,
        },

        assessments: [
          {
            ...dataFromPendingCandidate?.assessments[0],

            interviewer: {
              username: dataFromPendingCandidate?.assessments[0]?.interviewer?.username,
            },
          },
          {
            ...dataFromPendingCandidate?.assessments[1],
            interviewer: {
              username: dataFromPendingCandidate?.assessments[1]?.interviewer?.username,
            },
          },
        ],

        interviewDate: dataFromPendingCandidate?.interviewDate,
      });
      formik.setValues({
        name: dataFromPendingCandidate?.candidate?.name,
        educationStatus: dataFromPendingCandidate?.candidate?.educationStatus,
        position: dataFromPendingCandidate?.candidate?.position,
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
      interviewDate: value,
    };
    setDefaultValueInput({
      ...newValue,
    });
  };

  const handleSaveButton = () => {
    setShowModal(!showModal);
  };

  const handleSaveForm = async () => {
    const id = dataFromPendingCandidate?.candidate?.id;
    if (id) {
      // console.log("E >>", defaultValueInput);
      await dispatch(editPendingCandidate({ ...defaultValueInput, id }));
      handleCloseModal();
      setOpenAlert(true);
    } else {
      await dispatch(saveCandidate(defaultValueInput));
      handleCloseModal();
      handleBack();
      setOpenAlert(true);
    }
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
        ...defaultValueInput?.candidate,
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
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),

    educationStatus: yup.string().required("Required"),

    position: yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: defaultValueInput?.candidate?.name,
      educationStatus: defaultValueInput?.candidate?.educationStatus,
      position: defaultValueInput?.candidate?.position,
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      const newValue = {
        ...defaultValueInput,
        candidate: {
          ...defaultValueInput.candidate,
          name: values.name,
          educationStatus: values.educationStatus,
          position: values.position,
        },
      };
      setDefaultValueInput(newValue);
      handleSaveButton();
    },
    // handleSubmit: () => handleNext,
  });
  // console.log("E >>>", formik);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
                  // value={defaultValueInput?.candidate?.name}
                  // onChange={handleChangeValueGeneral}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
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
                    // value={formik.values.gender}
                    // onChange={formik.handleChange}
                    // error={formik.touched.gender && Boolean(formik.errors.gender)}
                    // helperText={formik.touched.gender && formik.errors.gender}
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
                  // value={formik.values.phone}
                  // onChange={formik.handleChange}
                  // error={formik.touched.phone && Boolean(formik.errors.phone)}
                  // helperText={formik.touched.phone && formik.errors.phone}
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
                  // value={defaultValueInput?.candidate?.educationStatus}
                  // onChange={handleChangeValueGeneral}
                  value={formik.values.educationStatus}
                  onChange={formik.handleChange}
                  error={formik.touched.educationStatus && Boolean(formik.errors.educationStatus)}
                  helperText={formik.touched.educationStatus && formik.errors.educationStatus}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="gpa"
                  label="GPA"
                  variant="outlined"
                  fullWidth
                  name="gpa"
                  onChange={handleChangeValueGeneral}
                  // value={formik.values.gpa}
                  // onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="position"
                  label="Position"
                  name="position"
                  variant="outlined"
                  fullWidth
                  // onChange={handleChangeValueGeneral}
                  // value={defaultValueInput?.candidate?.position}
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  error={formik.touched.position && Boolean(formik.errors.position)}
                  helperText={formik.touched.position && formik.errors.position}
                />
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
                    // value={formik.values.workMode}
                    // onChange={formik.handleChange}
                    // error={formik.touched.workMode && Boolean(formik.errors.workMode)}
                    // helperText={formik.touched.workMode && formik.errors.workMode}
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
                  // value={formik.values.interviewer1}
                  // onChange={formik.handleChange}
                  // error={formik.touched.interviewer1 && Boolean(formik.errors.interviewer1)}
                  // helperText={formik.touched.interviewer1 && formik.errors.interviewer1}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="interviewer2"
                  name="interviewer2"
                  options={userListSuggest}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  renderInput={(params) => <TextField {...params} label="Interview 2" />}
                  onChange={handleChangeInterviewer2}
                  value={defaultValueInput?.assessments[1]?.interviewer?.username || null}
                  // value={formik.values.interviewer2}
                  // onChange={formik.handleChange}
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
                      // value={formik.values.interviewDate}
                      // onChange={formik.handleChange}
                      // error={formik.touched.interviewDate && Boolean(formik.errors.interviewDate)}
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

              {/* <Button onClick={handleSubmit(handleSaveButton)} color="warning"> */}
              <Button type="submit" color="warning">
                Save
              </Button>
              {/* <Button onClick={handleSubmit(handleNext)}> */}
              <Button onClick={formik.handleSubmit}>
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
