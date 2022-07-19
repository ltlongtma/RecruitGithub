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
  },
});
export const { getCategory } = getCategorySlice.actions;
export default getCategorySlice.reducer;
