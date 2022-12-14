import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import questionBankApi from "../../../services/questionBankApi";
import { controller, ourRequest } from "../Slice";


const initialState = [];


export const getFilterCategory = createAsyncThunk(
  "getFilterCategorySlice/getFilterCategory",
  async (params) => {
    const response = await questionBankApi.getFilterCategory(params, {
      // cancelToken: ourRequest.token,
      signal: controller.signal,

    });
    return response;
  }
);

export const getFilterCategorySlice = createSlice({
  name: "getFilterCategory",
  initialState,
  reducers: {
    // getFilterCategory: (state, action) => {
    //   state = [...action.payload];
    //   return state;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getFilterCategory.fulfilled, (state, action) => {
      state = [...action.payload];
      return state;
    });
    builder.addCase(getFilterCategory.rejected, (state, action) => {
      console.log("rejected getFilterCategory", action.error);
    });
  },
});
// export const {  getFilterCategory} = getFilterCategorySlice.actions;
export default getFilterCategorySlice.reducer;
