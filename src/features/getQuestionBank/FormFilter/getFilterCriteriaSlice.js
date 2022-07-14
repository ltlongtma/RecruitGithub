import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const getFilterCriteriaSlice = createSlice({
  name: "getFilterCriteria",
  initialState,
  reducers: {
    getFilterCriteria: (state, action) => {
      state = [...action.payload];
      return state;
    },
  },
});
export const { getFilterCriteria } = getFilterCriteriaSlice.actions;
export default getFilterCriteriaSlice.reducer;
