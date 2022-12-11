import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authTypes } from "./auth.types";

const backendURL = "https://localhost:5000";

export const login = createAsyncThunk(
  authTypes.LOGIN,
  async ({ email, password, userType }, { rejectWithValue }) => {
    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      // const { data } = await axios.post(
      //   `${backendURL}/api/user/login`,
      //   {
      //     email,
      //     password,
      //     userType,
      //   },
      //   config
      // );

      const data = {
        userToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.ZWE7vXkPyWp4NFqo1QYqZHlrXNotERUN3iK-c0ailyw",
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        userType: "USER",
      };

      localStorage.setItem("userToken", data.userToken);
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  authTypes.SIGNUP,
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${backendURL}/api/user/register`,
        { firstName, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  `${backendURL}/user/getUserDetails`,
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.get(
        `${backendURL}/api/user/profile`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
