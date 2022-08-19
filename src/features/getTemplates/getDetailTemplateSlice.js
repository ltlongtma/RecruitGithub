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
    // getDetailTemplate: (state, action) => {
    //   state = { ...action.payload };
    //   return state;
    // },
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
// export const { getDetailTemplate } = getDetailTemplateSlice.actions;
export default getDetailTemplateSlice.reducer;
