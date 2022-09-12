import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import className from "classnames/bind";
import style from "./module.scss";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../../services/ManageUserApi";
import { getUsers } from "../../getUser/Slice";

const cx = className.bind(style);

export default function FillInfo({ activeStep, handleBack, handleNext, steps }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user);
  const [paramsGetUserList, SetParamsGetUserList] = React.useState({
    pageSize: 5,
  });
  React.useEffect(() => {
    userApi
      .filterUser(paramsGetUserList)
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((error) => {
        console.log("ERROR FILTER USER >>> " + error);
      });
  }, [paramsGetUserList]);

  const userListSuggest = userList.map((data) => {
    return data.username;
  });

  const [valueDate, setValueDate] = React.useState(dayjs());
  const handleChange = (newValue) => {
    setValueDate(newValue);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      graduate: "",
      position: "",
      interview1: "",
      dateOfBirth: dayjs(),
    },
  });
  const name = React.useRef({});
  name.current = watch("name");
  const graduate = React.useRef({});
  graduate.current = watch("graduate");
  const position = React.useRef({});
  position.current = watch("position");
  const interview1 = React.useRef({});
  interview1.current = watch("interview1");
  const dateOfBirth = React.useRef({});
  dateOfBirth.current = watch("dateOfBirth");

  return (
    <Box sx={{ p: 5 }}>
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
              label="Name"
              variant="outlined"
              // helperText="Incorrect entry."
              // error
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
                  defaultValue={dayjs()}
                  value={valueDate}
                  maxDate={dayjs()}
                  // onError={(value) => value !== dayjs() || "error message"}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="dateOfBirth"
                      {...register("dateOfBirth", {
                        required: "Invalid input",
                        validate: (value) => value !== dayjs() || "error message",
                      })}
                    />
                  )}
                />
              </Stack>
            </LocalizationProvider>
            <ErrorMessage
              errors={errors}
              name="dateOfBirth"
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
                defaultValue="male"
                // onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField id="phone" label="Phone" variant="outlined" fullWidth />
          </Grid>
        </Grid>

        <Grid container spacing={7} sx={{ p: 4 }}>
          <Grid item xs={3}>
            <TextField
              id="graduate"
              label="Graduate"
              variant="outlined"
              fullWidth
              required
              {...register("graduate", {
                required: "Invalid input",
                minLength: {
                  value: 3,
                  message: "Invalid input",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="graduate"
              render={({ message }) => <p className={cx("text-error")}>{message}</p>}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField id="gpa" label="GPA" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="position"
              label="Position"
              variant="outlined"
              fullWidth
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
              <InputLabel id="mode">Mode</InputLabel>
              <Select
                labelId="mode"
                id="mode"
                label="mode"
                defaultValue="fulltime"
                // onChange={handleChange}
              >
                <MenuItem value="intern3">Intern (3 days/week)</MenuItem>
                <MenuItem value="intern5">Intern (5 days/week)</MenuItem>
                <MenuItem value="contractor">Contractor</MenuItem>
                <MenuItem value="fulltime">Full Time</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 11 }}>
        <Typography variant="overline" className={cx("typography")}>
          Others information
        </Typography>
        <Grid container spacing={7} sx={{ p: 3 }}>
          <Grid item xs={4}>
            <Autocomplete
              required
              id="interview1"
              options={userListSuggest}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interview1"
                  {...register("interview1", {
                    required: "Invalid input",
                    minLength: {
                      value: 3,
                      message: "Invalid input",
                    },
                  })}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="interview1"
              render={({ message }) => <p className={cx("text-error")}>{message}</p>}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="interview2"
              options={userListSuggest}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Interview 2" />}
            />
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Date of Interview"
                  inputFormat="DD/MM/YYYY"
                  defaultValue={dayjs()}
                  value={valueDate}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 9 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button onClick={handleSubmit(handleNext)}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </div>
    </Box>
  );
}
