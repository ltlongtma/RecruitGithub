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
export const ApproveQuestion = createAsyncThunk(
  "getDetailQuestionSlice/ApproveQuestion",
  async (params) => {
    const response = await questionBankApi.approveQuestion(params);
    return response;
  }
);
const getDetailQuestionSlice = createSlice({
  name: "getDetailQuestion",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailQuestion.fulfilled, (state, action) => {
      state = { ...action.payload };
      return state;
    });
    builder.addCase(getDetailQuestion.rejected, (state, action) => {
      console.log("rejected getDetailQuestion", action.error);
    });
    builder.addCase(ApproveQuestion.fulfilled, (state, action) => {
      return;
    });
    builder.addCase(ApproveQuestion.rejected, (state, action) => {
      console.log("rejected ApproveQuestion", action.error);
    });
  },
});
export default getDetailQuestionSlice.reducer;
