import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionTemplate from "../../services/questionTemplates";
import { controller } from "../getQuestionBank/Slice";

const initialState = {
  templateList: {
    data: [],
    pagination: {},
  },
  createTemplate: [],
  detailTemplate: {},
};

export const getTemplateList = createAsyncThunk("Slice/getTemplateList", async (params) => {
  const response = await questionTemplate.getFilter(params, {
    signal: controller.signal,
  });
  return response;
});
export const templatesFilterByAdmin = createAsyncThunk(
  "Slice/templatesFilterByAdmin",
  async (params) => {
    const response = await questionTemplate.filterByAdmin(params, {
      signal: controller.signal,
    });
    return response;
  }
);
export const getDetailTemplate = createAsyncThunk("Slice/getDetailTemplate", async (params) => {
  const response = await questionTemplate.getById(params);
  return response;
});
export const cloneTemplate = createAsyncThunk("Slice/cloneTemplate", async (params) => {
  const response = await questionTemplate.cloneToMyTemplate(params);
  return response;
});
export const templateSlice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    removeOldDetailTemplate: (state) => {
      state.detailTemplate = {};
      return state;
    },
    addQuestionToTemplate: (state, action) => {
      state.createTemplate.push(action.payload);
      return state;
    },
    removeQuestionFromTemplate: (state, action) => {
      const newState = state.createTemplate.filter((item) => item.id !== action.payload.id);
      return (state = { ...state, createTemplate: [...newState] });
    },
    sortableChosenTemplate: (state, action) => {
      return (state = { ...state, createTemplate: [...action.payload] });
    },
    clearQuestionFromTemplate: (state, action) => {
      state.createTemplate = [];
      return state;
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getTemplateList.fulfilled, (state, action) => {
      state.templateList = { ...action.payload };
      return state;
    });
    builder.addCase(getTemplateList.rejected, (state, action) => {
      console.log("Rejected getTemplateList", action.error);
    });
    builder.addCase(templatesFilterByAdmin.fulfilled, (state, action) => {
      // let templateList = state.templateList;
      state.templateList = { ...action.payload };
      return state;
    });
    builder.addCase(templatesFilterByAdmin.rejected, (state, action) => {
      console.log("Rejected templatesFilterByAdmin", action.error);
    });
    builder.addCase(getDetailTemplate.fulfilled, (state, action) => {
      // let detailTemplate = state.detailTemplate;
      state.detailTemplate = { ...action.payload };
      return state;
    });
    builder.addCase(getDetailTemplate.rejected, (state, action) => {
      console.log("rejected getDetailTemplate", action.error);
    });

    builder.addCase(cloneTemplate.fulfilled, (state, action) => {
      alert("This template was cloned successfully");
    });
    builder.addCase(cloneTemplate.rejected, (state, action) => {
      console.log("Cloning was failed. Please try again later", action.error);
    });
  },
});
export const {
  removeOldDetailTemplate,
  addQuestionToTemplate,
  removeQuestionFromTemplate,
  sortableChosenTemplate,
  clearQuestionFromTemplate,
} = templateSlice.actions;
export default templateSlice.reducer;
