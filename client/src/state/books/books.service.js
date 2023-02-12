import { createAsyncThunk } from "@reduxjs/toolkit";
import { booksData } from "../../pages/books/dummyData";
import { bookTypes } from "./books.types";

export const fetchBookList = createAsyncThunk(
  bookTypes.FETCH_BOOK_LIST,
  async () => {
    return booksData;
  }
);
