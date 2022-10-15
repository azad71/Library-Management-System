import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    margin: "40px 0",
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px 0",
    flexDirection: "column",
  },

  linkStyles: {
    textDecoration: 'none',
    color: "white"
  }
}));

export const buttonStyles = {
  width: "400px",
  padding: "15px 0",
  margin: "20px",
};

export default useStyles;
