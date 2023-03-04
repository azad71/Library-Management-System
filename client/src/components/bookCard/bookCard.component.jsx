import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import bookImage from "../../assets/books.jpeg";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookCard({ data }) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleRenewal = () => {
    alert(`${data.title} is renewed`);
  };

  const handleReturn = () => {
    alert(`${data.title} is returned`);
  };

  const handleRent = () => {
    alert(`${data.title} is rented`);
  };

  const cardActionContent = (
    <>
      {data.stock > 0 && (
        <Button onClick={handleRent} size="small">
          Rent
        </Button>
      )}
      <Button onClick={handleRenewal} size="small">
        Renew
      </Button>
      <Button onClick={handleReturn} size="small">
        Return
      </Button>
    </>
  );

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/books/${data.id}`}>
        <CardMedia component="img" height="140" image={bookImage} alt="books" />
      </Link>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">By: {data.author}</Typography>
          <Typography variant="body1">Genre: {data.category}</Typography>
        </Box>
        <Typography marginY={1} variant="body2" color="text.secondary">
          {data.description.slice(0, 120)}
          <Link to={`/books/${data.id}`}> ...details</Link>
        </Typography>
        {isAuth && (
          <Typography>
            {data.stock === 0 ? (
              <span style={{ color: "red" }}>Stock out</span>
            ) : (
              <span>Stock: {data.stock}</span>
            )}
          </Typography>
        )}
      </CardContent>
      <CardActions>{isAuth && cardActionContent}</CardActions>
    </Card>
  );
}
