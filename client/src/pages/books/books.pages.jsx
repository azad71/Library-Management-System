import { Fragment } from "react";
import Navbar from "../../components/navbar/navbar.component";
import Container from "@mui/material/Container";
import SearchBar from "../../components/searchbar/searchbar.component";

export default function BooksPage() {
  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: "5%" }}>
        <SearchBar />
      </Container>
    </Fragment>
  );
}
