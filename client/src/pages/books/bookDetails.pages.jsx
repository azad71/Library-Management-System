import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchBookById } from "../../state/books/books.service";
import bookImage from "../../assets/books.jpeg";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({});

  useEffect(() => {
    const bookDetails = fetchBookById(bookId);
    setBookData(bookDetails);
  }, [bookId]);

  const bookActionButtons = (
    <>
      {bookData.stock > 0 && <Button variant="contained">Rent</Button>}
      <Button variant="contained">Renew</Button>
      <Button variant="contained">Return</Button>
    </>
  );

  return (
    <Container sx={{ my: 2 }} maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box>
          <Link onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </Link>
          <Typography
            textTransform="uppercase"
            my={3}
            textAlign="center"
            variant="h4"
          >
            {bookData.title}
          </Typography>

          <Box my={4}>
            <Box
              sx={{
                textAlign: "center",
                margin: "auto",
                display: "block",
              }}
              component="img"
              src={bookImage}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: 3,
            }}
          >
            <Typography variant="body1">
              Author:{" "}
              <strong>
                <i>{bookData.author}</i>
              </strong>
            </Typography>
            <Typography variant="body1">
              Category:{" "}
              <strong>
                <i>{bookData.category}</i>
              </strong>
            </Typography>
          </Box>

          <Typography my={3} variant="body1">
            ISBN: {bookData.ISBN}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 3,
            }}
          >
            <Typography my={3} variant="body1">
              Stock:{" "}
              {bookData.stock === 0 ? (
                <span style={{ color: "red" }}>Stock Out</span>
              ) : (
                <span style={{ color: "green" }}>Available for rent</span>
              )}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "50%",
              }}
            >
              {bookActionButtons}
            </Box>
          </Box>

          <Typography textAlign="left" variant="body1">
            Description: <br />
            {bookData.description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default BookDetails;
