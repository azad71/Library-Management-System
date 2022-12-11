import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.actions";

export const initialState = {
  isAuth: false,
  isLoading: false,
  userInfo: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.userInfo = null;
      state.error = null;
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.userInfo = payload;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
