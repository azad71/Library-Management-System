import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;
