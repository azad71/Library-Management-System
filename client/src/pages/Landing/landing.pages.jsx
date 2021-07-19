import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

import HrefButton from "../../components/common/HrefButton/HrefButton.component";

import LandingButtonData from "./landingButtonData";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "center",
    margin: "30px 0",
  },
}));

function LandingPage() {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.header} variant="h2">
        Welcome to Library Management System
      </Typography>
      <Container maxWidth="xs">
        <Grid direction="column" container spacing={3}>
          {LandingButtonData.map((data) => (
            <HrefButton path={data.path} text={data.text} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default LandingPage;
