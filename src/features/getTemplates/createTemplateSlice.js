import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    clearQuestionFromTemplate: (state, action) => {
      return (state = []);
    },
  },
});
export const {
  addQuestionToTemplate,
  removeQuestionFromTemplate,
  sortableChosenTemplate,
  clearQuestionFromTemplate,
} = createTemplateSlice.actions;
export default createTemplateSlice.reducer;
