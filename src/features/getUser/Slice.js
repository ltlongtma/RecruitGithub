import { Alert, Snackbar } from "@mui/material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import userApi from "../../services/ManageUserApi";

const initialState = [];

export const login = createAsyncThunk("Slice/getUser", async (params) => {
  const response = await userApi.login(params);
  return response;
});

export const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,

  reducers: {
    getUsers: (state, action) => {
      state = [...action.payload];
      return state;
    },

    editUser: (state, action) => {
      const newState = [...state];

      const index = newState.findIndex((user) => user.id === action.payload.id);
      newState[index] = action.payload;

      return newState;
    },

    createNewUser: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      sessionStorage.setItem("isRole", action.payload.role[0]);
      sessionStorage.setItem("isToken", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      alert("Your account is not authorized to login. Please create a new account and try again");
 ;
    });
  },
});

export const { getUsers, editUser, createNewUser } = getUsersSlice.actions;
export default getUsersSlice.reducer;
