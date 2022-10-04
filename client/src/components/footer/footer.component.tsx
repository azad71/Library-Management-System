import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import useStyles from "./footer.style";

export default function Footer() {
  const classes = useStyles();

  return (
    <Typography className={classes.wrapper} textAlign="center">
      Developed by{" "}
      <Link
        href="https://github.com/azad71"
        target="_blank"
        rel="noopener noreferrer"
      >
        Azad Mamun
      </Link>{" "}
      &copy;{new Date().getFullYear()}
    </Typography>
  );
}
