import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

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
        <Link className={classes.profile} href="https://github.com/azad71" target="_blank">
          &copy;Azad Mamun
        </Link>
      </Typography>
    </Box>
  );
}

export default Copyright;
