import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [], pagination: {} };

export const getTemplateListSlice = createSlice({
  name: "getTemplateListSlice",
  initialState,
  reducers: {
    getTemplateList: (state, action) => {
      state = { ...action.payload };

      return state;
    },
  },
});
export const { getTemplateList } = getTemplateListSlice.actions;
export default getTemplateListSlice.reducer;
