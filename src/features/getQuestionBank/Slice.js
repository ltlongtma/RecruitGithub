import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import questionBankApi from "../../services/questionBankApi";

const initialState = { data: [], pagination: {} };

export const ourRequest = axios.CancelToken.source();

export const getQuestionBank = createAsyncThunk(
  "getQuestionBankSlice/getQuestionBank",
  async (params) => {
    const response = await questionBankApi.getAll(params, {
      cancelToken: ourRequest.token,
    });

    return response;
  }
);

export const getQuestionBankSlice = createSlice({
  name: "getQuestionBank",
  initialState,
  reducers: {
    // getQuestionBank: (state, action) => {
    //   state = { ...action.payload };
    //   return state;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestionBank.fulfilled, (state, action) => {
      state = { ...action.payload };
      return state;
    });
    builder.addCase(getQuestionBank.rejected, (state, action) => {
      console.log("REJECTED getQuestionBank", action.error);
    });
  },
});
// export const { getQuestionBank } = getQuestionBankSlice.actions;
export default getQuestionBankSlice.reducer;
