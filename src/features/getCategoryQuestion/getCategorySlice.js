import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const getCategorySlice = createSlice({
  name: "getCategory",
  initialState,
  reducers: {
    getCategory: (state, action) => {
      state = [...action.payload];
      return state;
    },
    editCategoryStatus: (state, action) => {
      const newState = [...state];
      newState.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        else return item;
      });
      return newState
    },
  },
});
export const { getCategory, editCategoryStatus } = getCategorySlice.actions;
export default getCategorySlice.reducer;
