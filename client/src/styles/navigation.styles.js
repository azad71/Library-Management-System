import makeStyles from "@mui/styles/makeStyles";

const navigationStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "white",
    textDecoration: "none",
  },

  links: {
    textDecoration: "none",
    alignItems: "center",
    color: "white",
  },

  sectionDesktop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "120px",
    marginRight: "30px",
  },
}));

export default navigationStyles;
