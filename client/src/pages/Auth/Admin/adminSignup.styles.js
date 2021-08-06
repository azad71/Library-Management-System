import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  input: {
    marginBottom: "25px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  errorText: {
    color: "rgba(255, 0, 0, 0.759)",
    fontSize: " 12px",
    marginTop: "-10px",
    padding: "15px 0",
    position: "absolute",
    fontWeight: "500",
    letterSpacing: "1px",
  },

  link: {
    textDecoration: "none",
  },
}));

export default useStyles;
