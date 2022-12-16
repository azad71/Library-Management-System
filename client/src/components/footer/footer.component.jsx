import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <Typography variant="body2" align="center" textAlign="center">
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
