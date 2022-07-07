import { configureStore } from "@reduxjs/toolkit";
import getUsersReducer from "../features/getUser/getUsersSlice";
import getQuestionBankReducer from "../features/getQuestionBank/getQuestionBankSlice";

const rootReducer = { user: getUsersReducer, questionBank: getQuestionBankReducer };
const store = configureStore({
  reducer: rootReducer,
});
export default store;
