import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  buttons: {
    width: "100%",
    padding: "10px 0",
  },
}));

function HrefButton({ path, text, variant = "contained", color = "primary" }) {
  const classes = useStyles();

  return (
    <Grid item>
      <Link href={path}>
        <Button className={classes.buttons} variant={variant} color={color}>
          {text}
        </Button>
      </Link>
    </Grid>
  );
}

export default HrefButton;
