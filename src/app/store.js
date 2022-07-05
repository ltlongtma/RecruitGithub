import { configureStore } from "@reduxjs/toolkit";
import getUsersReducer from "../features/getUser/getUsersSlice";

const rootReducer = { user: getUsersReducer };
const store = configureStore({
  reducer: rootReducer,
});
export default store;
