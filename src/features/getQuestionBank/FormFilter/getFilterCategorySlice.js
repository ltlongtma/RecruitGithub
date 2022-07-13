import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const getFilterCategorySlice = createSlice({
  name: "getFilterCategory",
  initialState,
  reducers: {
  
    getFilterCategory: (state, action) => {
      state = [...action.payload];
      return state;
    }
  },
});
export const {  getFilterCategory} = getFilterCategorySlice.actions;
export default getFilterCategorySlice.reducer;
