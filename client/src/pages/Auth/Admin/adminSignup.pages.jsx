import { Formik } from "formik";
import { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOpenOutlined from "@material-ui/icons/LockOpenOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import adminSignupValidationSchema from "../../../validations/auth/adminSignup.validator";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
}));

const inputProps = {
  variant: "outlined",
  margin: "dense",
  required: true,
  fullWidth: true,
  autoFocus: true,
};

export default function SignIn() {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    adminSecret: "",
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Signup
        </Typography>

        <Formik
          initialValues={{ ...values }}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validationSchema={adminSignupValidationSchema}
          validateOnBlur={false}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            isSubmitting,
            touched,
            handleBlur,
            setFieldTouched,
            handleReset,
          }) => (
            <form className={classes.form} noValidate>
              <div className={classes.input}>
                <TextField
                  {...inputProps}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("username");
                  }}
                />
                <p className={classes.errorText}>{touched.username && errors.username}</p>
              </div>

              <div className={classes.input}>
                <TextField
                  {...inputProps}
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("email");
                  }}
                />
                <p className={classes.errorText}>{touched.email && errors.email}</p>
              </div>

              <div className={classes.input}>
                <TextField
                  {...inputProps}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("password");
                  }}
                />

                <p className={classes.errorText}>{touched.password && errors.password}</p>
              </div>

              <div className={classes.input}>
                <TextField
                  {...inputProps}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("confirmPassword");
                  }}
                />

                <p className={classes.errorText}>{touched.confirmPassword && errors.confirmPassword}</p>
              </div>

              <div className={classes.input}>
                <TextField
                  {...inputProps}
                  id="secretCode"
                  label="Admin Secret Code"
                  name="secretCode"
                  type="password"
                  autoComplete="secretCode"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("secretCode");
                  }}
                />
                <p className={classes.errorText}>{touched.secretCode && errors.secretCode}</p>
              </div>

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Signup
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
