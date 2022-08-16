import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const createTemplateSlice = createSlice({
  name: "createTemplate",
  initialState,
  reducers: {
    addQuestionToTemplate: (state, action) => {
      state.push(action.payload);
      return state;
    },
    removeQuestionFromTemplate: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload.id);
      return newState;
    },
    sortableChosenTemplate: (state, action) => {
      return action.payload;
    },
  },
});
export const { addQuestionToTemplate, removeQuestionFromTemplate, sortableChosenTemplate } =
  createTemplateSlice.actions;
export default createTemplateSlice.reducer;
