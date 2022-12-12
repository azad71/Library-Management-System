import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({}));

export const navbarButtonStyles = {
  color: "#fff",
  textTransform: "unset",
};

export const navbarDrawerContainer = {
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: 240,
  },
};

export const homeButton = {
  flexGrow: 1,
  display: { xs: "block", sm: "block" },
};

export default useStyles;
