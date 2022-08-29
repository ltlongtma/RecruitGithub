import { createSlice } from "@reduxjs/toolkit";
const initialState = { data: [], pagination: {} };

export const getCriteriaSlice = createSlice({
  name: "getCriteria",
  initialState,
  reducers: {
    getCriteria: (state, action) => {
      state = { ...action.payload };
      return state;
    },
  },
});
export const { getCriteria } = getCriteriaSlice.actions;
export default getCriteriaSlice.reducer;
