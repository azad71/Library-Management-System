import { Fragment } from "react";
import Navbar from "../../components/navbar/navbar.component";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import BookCard from "../../components/bookCard/bookCard.component";
// import SearchBar from "../../components/searchbar/searchbar.component";

export default function BooksPage() {
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
          <Grid item xs={12} sm={4} md={4}>
            <BookCard />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <BookCard />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <BookCard />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <BookCard />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <BookCard />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <BookCard />
          </Grid>{" "}
          <Grid item xs={12} sm={4} md={4}>
            <BookCard />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
