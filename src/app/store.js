import { configureStore } from "@reduxjs/toolkit";
import getUsersReducer from "../features/getUser/Slice";
import getQuestionBankReducer from "../features/getQuestionBank/Slice";
import getFilterCategoryReducer from "../features/getQuestionBank/FormFilter/getFilterCategorySlice";
import getDetailQuestion from "../features/getDetailQuestion/Slice";
import getFilterCriteriaReducer from "../features/getQuestionBank/FormFilter/getFilterCriteriaSlice";
import getCategoryReducer from "../features/getCategoryQuestion/Slice";
import getCriteriaReducer from "../features/getCriteria/Slice";
import templateSliceReducer from "../features/getTemplates/Slice";
import interviewSliceReducer from "../features/interview/FillInfo/Slice";

const rootReducer = {
  user: getUsersReducer,
  questionBank: getQuestionBankReducer,
  filterCategory: getFilterCategoryReducer,
  getDetailQuestion: getDetailQuestion,
  filterCriteria: getFilterCriteriaReducer,
  getCategoryQuestion: getCategoryReducer,
  getCriteria: getCriteriaReducer,
  template: templateSliceReducer,
  interview: interviewSliceReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
