import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const getDetailTemplateSlice = createSlice({
  name: "getDetailTemplate",
  initialState,
  reducers: {
    getDetailTemplate: (state, action) => {
      state = { ...action.payload };
      return state;
    },
  },
});
export const { getDetailTemplate } = getDetailTemplateSlice.actions;
export default getDetailTemplateSlice.reducer;
