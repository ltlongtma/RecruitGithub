import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const getDetailQuestionSlice = createSlice({
  name: "getDetailQuestion",
  initialState,
  reducers: {
    getDetailQuestion: (state, action) => {
      state = { ...action.payload };
      return state;
    },
  },
});
export const { getDetailQuestion } = getDetailQuestionSlice.actions;
export default getDetailQuestionSlice.reducer;
