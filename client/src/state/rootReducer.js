import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
