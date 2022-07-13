import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const getQuestionBankSlice = createSlice({
  name: "getQuestionBank",
  initialState,
  reducers: {
    getQuestionBank: (state, action) => {
      state = [...action.payload];
      return state;
    },
  },
});
export const { getQuestionBank } = getQuestionBankSlice.actions;
export default getQuestionBankSlice.reducer;
