import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useStyles, { buttonStyles } from "./landing.styles";

function LandingPage() {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Typography textAlign="center" variant="h3">
          Welcome to Library Management System
        </Typography>

        <Box className={classes.buttonWrapper}>
          <Button sx={{ ...buttonStyles }} variant="contained">
            Sign in
          </Button>
          <Button sx={{ ...buttonStyles }} variant="contained">
            Sign up
          </Button>
          <Button sx={{ ...buttonStyles }} variant="contained">
            Browse books
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
}

export default LandingPage;
