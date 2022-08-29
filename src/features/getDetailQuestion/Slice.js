import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionBankApi from "../../services/questionBankApi";

const initialState = {};
export const getDetailQuestion = createAsyncThunk(
  "getDetailQuestionSlice/getDetailQuestion",
  async (params) => {
    const response = await questionBankApi.getById(params);
    return response;
  }
);
const getDetailQuestionSlice = createSlice({
  name: "getDetailQuestion",
  initialState,
  reducers: {
    // getDetailQuestion: (state, action) => {
    //   state = { ...action.payload };
    //   return state;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailQuestion.fulfilled, (state, action) => {
      state = { ...action.payload };
      return state;
    });
    builder.addCase(getDetailQuestion.rejected, (state, action) => {
      console.log("rejected getDetailQuestion", action.error);
    });
  },
});
// export const { getDetailQuestion } = getDetailQuestionSlice.actions;
export default getDetailQuestionSlice.reducer;
