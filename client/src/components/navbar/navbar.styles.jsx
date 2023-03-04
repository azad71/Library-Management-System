import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({}));

export const navbarButtonStyles = {
  color: "#fff",
  textTransform: "unset",
  fontSize: "16px",
};

export const navbarDrawerContainer = {
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: 240,
  },
};

export const homeButtonLinkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: 500,
};

export const homeButton = {
  flexGrow: 1,
  display: { xs: "block", sm: "block" },
  ...homeButtonLinkStyle,
  color: "#fff",
  fontSize: "24px",
};

export default useStyles;
