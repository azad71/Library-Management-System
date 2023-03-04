import { Fragment, useEffect } from "react";
import Navbar from "../../components/navbar/navbar.component";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import BookCard from "../../components/bookCard/bookCard.component";
import { selectAllBooks } from "../../state/books/books.slice";
import { fetchBookList } from "../../state/books/books.service";
import { useDispatch, useSelector } from "react-redux";
// import SearchBar from "../../components/searchbar/searchbar.component";

const Spinner = ({ text }) => <div>{text}</div>;

export default function BooksPage() {
  const dispatch = useDispatch();
  const bookStatus = useSelector((state) => state.books.status);
  const booksList = useSelector(selectAllBooks);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    if (bookStatus === "init") {
      dispatch(fetchBookList());
    }
  }, [bookStatus, dispatch]);

  let content;

  if (bookStatus === "loading") {
    content = <Spinner text="Loading" />;
  } else if (bookStatus === "success") {
    content = booksList.map((book) => (
      <Grid key={book.id} item xs={12} sm={6} md={4}>
        <BookCard data={book} />
      </Grid>
    ));
  } else if (bookStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <Fragment>
      <Navbar />
      <CssBaseline />

      <Container sx={{ my: 15 }} maxWidth="lg">
        <TextField
          placeholder="Search books by author, name, isbn and category"
          id="bookSearch"
          variant="standard"
          fullWidth
        />
        <Grid sx={{ my: 5 }} container columnSpacing={3} rowSpacing={3}>
          {content}
        </Grid>
      </Container>
    </Fragment>
  );
}
