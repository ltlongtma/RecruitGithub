import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: [] };

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

export const { getUsers, deleteUser } = getUsersSlice.actions;
export default getUsersSlice.reducer;
