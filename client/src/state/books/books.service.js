import { createAsyncThunk } from "@reduxjs/toolkit";
import { booksData } from "../../pages/books/dummyData";
import { bookTypes } from "./books.types";

export const fetchBookList = createAsyncThunk(
  bookTypes.FETCH_BOOK_LIST,
  async () => {
    return booksData;
  }
);

// export const fetchBookById = createAsyncThunk(
//   bookTypes.FETCH_BOOK_BY_ID,
//   async (bookId) => {
//     return booksData.find((book) => book.id === Number(bookId));
//   }
// );

// should be an api call
export const fetchBookById = (bookId) =>
  booksData.find((book) => book.id === Number(bookId));
