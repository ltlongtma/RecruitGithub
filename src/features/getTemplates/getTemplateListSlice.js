import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionTemplate from "../../services/questionTemplates";

const initialState = { data: [], pagination: {} };

export const getTemplateList = createAsyncThunk(
  "getTemplateListSlice/getTemplateList",
  async (params) => {
    const response = await questionTemplate.getFilter(params);
    return response;
  }
);
export const templatesFilterByAdmin = createAsyncThunk(
  "getTemplateListSlice/templatesFilterByAdmin",
  async (params) => {
    const response = await questionTemplate.filterByAdmin(params);
    return response;
  }
);

export const getTemplateListSlice = createSlice({
  name: "getTemplateListSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getTemplateList.fulfilled, (state, action) => {
      // Add user to the state array
      state = { ...action.payload };
      return state;
    });
    builder.addCase(getTemplateList.rejected, (state, action) => {
      console.log("Rejected getTemplateList", action.error);
    });
    builder.addCase(templatesFilterByAdmin.fulfilled, (state, action) => {
      state = { ...action.payload };
      return state;
    });
    builder.addCase(templatesFilterByAdmin.rejected, (state, action) => {
      console.log("Rejected templatesFilterByAdmin", action.error);
    });
  },
});
export default getTemplateListSlice.reducer;
