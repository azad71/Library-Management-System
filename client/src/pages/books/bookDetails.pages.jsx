import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchBookById } from "../../state/books/books.service";

function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const bookDetails = fetchBookById(bookId);

  return (
    <Container maxWidth="md">
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
          <h1>{bookDetails.title}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut unde
            facilis consequuntur voluptatem debitis omnis, quaerat, autem
            perspiciatis recusandae dolor, delectus vitae ipsa sunt ullam odit
            vel! Expedita cupiditate esse incidunt laboriosam, cumque
            repudiandae ab enim voluptate culpa quos dicta sunt ducimus illo
            laudantium voluptates illum adipisci quia quaerat odit dolorum
            accusantium ipsam? Atque odio vel animi magni molestias quidem quia,
            nisi temporibus optio ipsam sapiente doloribus quibusdam nesciunt
          </p>
        </Box>
      </Box>
    </Container>
  );
}

export default BookDetails;
