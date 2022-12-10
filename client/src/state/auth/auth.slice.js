import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.actions";

const userToken = localStorage.getItem("userToken") ?? null;

export const initialState = {
  isAuth: false,
  isLoading: false,
  userInfo: null,
  userToken,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.currentUser = undefined;
      state.userInfo = null;
      state.userToken = null;
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
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
