import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import questionCriteriaApi from "../../../services/questionCriteriaApi";
import { ourRequest } from "../Slice";

const initialState = [];

export const getFilterCriteria = createAsyncThunk(
  "getFilterCriteriaSlice/getFilterCriteria",
  async (params) => {
    const response = await questionCriteriaApi.getAll(params, {
      cancelToken: ourRequest.token,
    });
    return response;
  }
);
export const getFilterCriteriaSlice = createSlice({
  name: "getFilterCriteria",
  initialState,
  reducers: {
    // getFilterCriteria: (state, action) => {
    //   state = [...action.payload];
    //   return state;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getFilterCriteria.fulfilled, (state, action) => {
      state = [...action.payload];
      return state;
    });
    builder.addCase(getFilterCriteria.rejected, (state, action) => {
      console.log("rejected getFilterCriteria", action.error);
    });
  },
});
// export const { getFilterCriteria } = getFilterCriteriaSlice.actions;
export default getFilterCriteriaSlice.reducer;
