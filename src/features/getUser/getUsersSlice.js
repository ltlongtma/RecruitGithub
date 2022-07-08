import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,

  reducers: {
    getUsers: (state, action) => {
      // const newState = [...action.payload];
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
});

export const { getUsers, editUser, createNewUser } = getUsersSlice.actions;
export default getUsersSlice.reducer;
