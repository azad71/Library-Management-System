import { ICurrentUser } from "../../types/slices";
import { AppThunk } from "../store";
import { setAuthFailed, setAuthSuccess, setLoading } from "./authSlice";

export const login = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // trigger login api
    const currentUser: ICurrentUser = {
      id: "gg",
      name: "gg",
      email: "gg@gg.com",
      userType: "USER",
    };

    dispatch(setAuthSuccess(currentUser));
  } catch (error) {
    const err = new Error("Something went wrong");
    dispatch(setAuthFailed(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logOut = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // trigger logout api
  } catch (error) {
    const err = new Error("Something went wrong");
    dispatch(setAuthFailed(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};
