import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttons: {
    width: "100%",
    padding: "10px 0",
  },

  links: {
    textDecoration: "none",
  },
}));

function HrefButton({ path, text, variant = "contained", color = "primary" }) {
  const classes = useStyles();

  return (
    <Grid item>
      <Link className={classes.links} to={path}>
        <Button className={classes.buttons} variant={variant} color={color}>
          {text}
        </Button>
      </Link>
    </Grid>
  );
}

export default HrefButton;
