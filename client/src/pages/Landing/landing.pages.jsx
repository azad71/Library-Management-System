import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

import HrefButton from "../../components/common/HrefButton/HrefButton.component";

import LandingButtonData from "./landingButtonData";

const useStyles = makeStyles(() => ({
  header: {
    textAlign: "center",
    margin: "30px ",
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <>
      <Header className={classes.header} variant="h2">
        Welcome to Library Management System
      </Header>
      <Container maxWidth="xs">
        <Grid direction="column" container spacing={3}>
          {LandingButtonData.map((data, idx) => (
            <HrefButton key={idx} path={data.path} text={data.text} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default LandingPage;

const Header = styled(Typography)`
  text-align: center;
  margin: 30px 0;
`;
