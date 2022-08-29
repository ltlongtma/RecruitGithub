import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionTemplate from "../../services/questionTemplates";

const initialState = {};
export const getDetailTemplate = createAsyncThunk(
  "getDetailTemplateSlice/getDetailTemplate",
  async (params) => {
    const response = await questionTemplate.getById(params);
    return response;
  }
);

export const getDetailTemplateSlice = createSlice({
  name: "getDetailTemplate",
  initialState,
  reducers: {
    removeOldDetailTemplate: (state) => {
      state = {};
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailTemplate.fulfilled, (state, action) => {
      state = { ...action.payload };
      return state;
    });
    builder.addCase(getDetailTemplate.rejected, (state, action) => {
      console.log("rejected getDetailTemplate", action.error);
    });
  },
});
export const { removeOldDetailTemplate } = getDetailTemplateSlice.actions;
export default getDetailTemplateSlice.reducer;
