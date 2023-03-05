import { createSlice } from "@reduxjs/toolkit";

import { fetchBookList } from "./books.service";

export const initialState = {
  booksList: [],
  isLoading: false,
  status: "init", // init, pending, success, failed
  error: null,
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBookList.fulfilled, (state, action) => {
        state.status = "success";
        state.booksList = action.payload;
      })
      .addCase(fetchBookList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getBooks } = bookSlice.actions;

export const selectAllBooks = (state) => state.books.booksList;

export const selectBookById = (state, bookId) =>
  state.books.booksList.find((book) => book.id === Number(bookId));

export default bookSlice.reducer;
