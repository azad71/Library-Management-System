import { createAsyncThunk } from "@reduxjs/toolkit";
import { booksData } from "../../pages/books/dummyData";
import { bookTypes } from "./books.types";
import axios from "axios";
import { getDummyBookData } from "./books.service";

export const fetchBooks = createAsyncThunk(
  bookTypes.FETCH_BOOK_LIST,
  async ({}, { rejectWithValue }) => {
    try {
      return await getDummyBookData();
    } catch (error) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
