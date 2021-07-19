import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: "center",
    // fontSize: "18px",
  },

  profile: {
    "&:hover": {
      textDecoration: "none",
      letterSpacing: "1.5px",
      transition: ".8s all",
    },
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Box className={classes.footer} mt={12}>
      <Typography variant="h6">
        Developed by:{" "}
        <Link className={classes.profile} href="https://github.com/azad71">
          &copy;Azad Mamun
        </Link>
      </Typography>
    </Box>
  );
}

export default Copyright;
