import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import bookReducer from "./books/books.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
});

export default persistReducer(persistConfig, rootReducer);
