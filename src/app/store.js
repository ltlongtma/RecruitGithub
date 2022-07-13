import { configureStore } from "@reduxjs/toolkit";
import getUsersReducer from "../features/getUser/getUsersSlice";
import getQuestionBankReducer from "../features/getQuestionBank/getQuestionBankSlice";
import getFilterCategoryReducer from "../features/getQuestionBank/FormFilter/getFilterCategorySlice";

const rootReducer = {
  user: getUsersReducer,
  questionBank: getQuestionBankReducer,
  filterCategory: getFilterCategoryReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
