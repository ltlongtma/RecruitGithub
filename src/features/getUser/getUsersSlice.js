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
      // state.splice(action.payload, 1);
    },
  },
});

export const { getUsers, deleteUser } = getUsersSlice.actions;
export default getUsersSlice.reducer;
