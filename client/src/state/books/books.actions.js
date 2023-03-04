import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookTypes } from "./books.types";
import { booksData } from "../../pages/books/dummyData";

export const fetchBooks = createAsyncThunk(
  bookTypes.FETCH_BOOK_LIST,
  async ({}, { rejectWithValue }) => {
    try {
      // return await getDummyBookData();
      return booksData;
    } catch (error) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchBookById = createAsyncThunk(
  bookTypes.FETCH_BOOK_BY_ID,
  async ({ bookId }, { rejectWithValue }) => {
    try {
      return booksData.find((book) => book.id === Number(bookId));
    } catch (error) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
