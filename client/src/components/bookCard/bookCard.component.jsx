import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import bookImage from "../../assets/books.jpeg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";

export default function BookCard({ data }) {
  const count = 0;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={bookImage} alt="books" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description.slice(0, 120)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <ThumbUpIcon /> ({count})
        </Button>
        <Button size="small">
          <CommentIcon /> ({count})
        </Button>
        <Button size="small">Rent/Renew/Return</Button>
      </CardActions>
    </Card>
  );
}
