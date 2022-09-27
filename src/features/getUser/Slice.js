import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/ManageUserApi";
import { ourRequest } from "../getQuestionBank/Slice";

const initialState = { data: [], pagination: {} };

export const login = createAsyncThunk("Slice/getUser", async (params) => {
  const response = await userApi.login(params);
  return response;
});
export const getUsersByAdmin = createAsyncThunk("getUsers/getUsersByAdmin", async (params) => {
  const response = await userApi.filterUser(params, { cancelToken: ourRequest.token });
  return response;
});
export const deleteUser = createAsyncThunk("getUsers/deleteUser", async (params) => {
  const response = await userApi.deleteUser(params, { cancelToken: ourRequest.token });
  return response;
});
export const createNewUser = createAsyncThunk("getUsers/createNewUser", async (params) => {
  const response = await userApi.postNewUser(params, { cancelToken: ourRequest.token });
  return response;
});
export const editUser = createAsyncThunk("getUsers/editUser", async (id, role) => {
  const response = await userApi.changeRoleUser(id, role);
  return response;
});
export const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,

  reducers: {
    // editUser: (state, action) => {
    //   const newState = [...state];
    //   const index = newState.findIndex((user) => user.id === action.payload.id);
    //   newState[index] = action.payload;
    //   return newState;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      sessionStorage.setItem("isRole", action.payload.role[0]);
      sessionStorage.setItem("isToken", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      alert("Your account is not authorized to login. Please create a new account and try again");
    });
    builder.addCase(getUsersByAdmin.fulfilled, (state, action) => {
      state = { ...action.payload };
      return state;
    });
    builder.addCase(getUsersByAdmin.rejected, (state, action) => {
      console.log("Get users by admin  filter was failed. Please try again later", action.error);
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.data.push(action.payload);
      return state;
    });
    builder.addCase(createNewUser.rejected, (state, action) => {
      console.log("Create new user was failed. Please try again later", action.error);
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      const newState = [...state];
      const index = newState.findIndex((user) => user.id === action.payload.id);
      newState[index] = action.payload;
      // console.log("E >>", newState);
      return newState;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      console.log("Create new user was failed. Please try again later", action.error);
    });
  },
});

export const {} = getUsersSlice.actions;
export default getUsersSlice.reducer;
