import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import bookImage from "../../assets/books.jpeg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function BookCard({ data, isAuth }) {
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
      </CardContent>
      <CardActions>
        <Button size="small">
          <ThumbUpIcon /> ({data.likeCount})
        </Button>
        <Button size="small">
          <CommentIcon /> ({data.commentCount})
        </Button>
        {isAuth && <Button size="small">Rent/Renew/Return</Button>}
      </CardActions>
    </Card>
  );
}
