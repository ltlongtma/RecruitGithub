import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,

  reducers: {
    getUsers: (state, action) => {
      state.push(...action.payload);
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload);
    },
  },
});

export const { getUsers, deleteUser, editUser } = getUsersSlice.actions;
export default getUsersSlice.reducer;
