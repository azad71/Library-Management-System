import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk } from "../store";
import { RootState } from "../rootReducer";
import { IAuthError, IAuthState, ICurrentUser } from "../../types/slices";

export const initialState: IAuthState = {
  isAuth: false,
  isLoading: false,
  error: { message: "Something went wrong" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    setAuthSuccess: (state, { payload }: PayloadAction<ICurrentUser>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.currentUser = undefined;
    },
    setAuthFailed: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isAuth = false;
    },
  },
});

export const { setAuthSuccess, setLogout, setLoading, setAuthFailed } =
  authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: RootState) => state.auth;
