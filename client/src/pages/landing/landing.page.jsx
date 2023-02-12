import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useStyles, { buttonStyles } from "./landing.styles";

function LandingPage() {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Container>
        <Typography marginY={3} textAlign="center" variant="h3">
          Welcome to Library Management System
        </Typography>

        <Box className={classes.buttonWrapper}>
          <Link to="/login" className={classes.linkStyles}>
            <Button sx={{ ...buttonStyles }} variant="contained">
              Login
            </Button>
          </Link>

          <Link to="/signup" className={classes.linkStyles}>
            <Button sx={{ ...buttonStyles }} variant="contained">
              Signup
            </Button>
          </Link>

          <Link to="/books" className={classes.linkStyles}>
            <Button sx={{ ...buttonStyles }} variant="contained">
              Browse books
            </Button>
          </Link>
        </Box>
      </Container>
    </Fragment>
  );
}

export default LandingPage;
