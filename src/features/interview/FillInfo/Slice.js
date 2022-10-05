import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import interviewApi from "../../../services/interviewFormApi";
import { controller } from "../../getQuestionBank/Slice";

const initialState = {
  pendingList: {
    data: [],
    pagination: {},
  },
  detailPendingCandidate: {},
};

export const filterCandidateByAdmin = createAsyncThunk(
  "interview/filterByAdmin",
  async (params) => {
    const response = await interviewApi.filterByAdmin(params, {
      signal: controller.signal,
    });
    return response;
  }
);
export const getDetailPendingCandidate = createAsyncThunk(
  "interview/getDetailPendingCandidate",
  async (params) => {
    const response = await interviewApi.getById(params);

    return response;
  }
);
export const saveCandidate = createAsyncThunk("interview/saveCandidate", async (params) => {
  const response = await interviewApi.create(params, {
    signal: controller.signal,
  });

  return response;
});
export const editPendingCandidate = createAsyncThunk(
  "interview/editPendingCandidate",
  async (data) => {
    const response = await interviewApi.updateFormById(data, {
      signal: controller.signal,
    });
    return response;
  }
);
export const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(filterCandidateByAdmin.fulfilled, (state, action) => {
      state.pendingList = { ...action.payload };
      return state;
    });
    builder.addCase(filterCandidateByAdmin.rejected, (state, action) => {
      console.log("Rejected filterByAdmin in Interview Form", action.error);
    });
    builder.addCase(saveCandidate.fulfilled, (state, action) => {
      state.pendingList.data.push(action.payload);
      return state;
    });
    builder.addCase(saveCandidate.rejected, (state, action) => {
      console.log("Rejected Save Candidate To Pending List", action.error);
    });
    builder.addCase(getDetailPendingCandidate.fulfilled, (state, action) => {
      state.detailPendingCandidate = { ...action.payload };
      return state;
    });
    builder.addCase(getDetailPendingCandidate.rejected, (state, action) => {
      console.log("rejected getDetailPendingCandidate", action.error);
    });
    builder.addCase(editPendingCandidate.fulfilled, (state, action) => {
      const index = state.pendingList.data.findIndex(
        (can) => can?.candidate.id === action.payload.candidate.id
      );
      state.pendingList.data[index] = action.payload;
      return state;
      // const newState = [...state.pendingList.data];
      // const index = newState.findIndex(
      //   (item) => item?.candidate.id === action.payload.candidate.id
      // );
      // newState[index] = action.payload;
      // console.log("INDEX >>>", index);
      // return newState;
    });
    builder.addCase(editPendingCandidate.rejected, (state, action) => {
      console.log("rejected editPendingCandidate", action.error);
    });
  },
});
export const {} = interviewSlice.actions;
export default interviewSlice.reducer;
