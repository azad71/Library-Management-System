import { Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOpenOutlined from "@material-ui/icons/LockOpenOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import loginValidationSchema from "../../../validations/auth/login.validator";

import useStyles from "../admin/adminSignup.styles";

const inputProps = {
  variant: "outlined",
  margin: "dense",
  required: true,
  fullWidth: true,
  autoFocus: true,
};

export default function AdminLogin() {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: "",
    password: "",
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
          User Login
        </Typography>

        <Formik
          initialValues={{ ...values }}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validationSchema={loginValidationSchema}
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
                  placeholder="Provide email or username"
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

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Signup
              </Button>
              <Grid justifyContent="flex-end" container>
                <Grid item xs>
                  <Link className={classes.link} to="/">
                    Home
                  </Link>
                </Grid>
                <Grid item>
                  <Link className={classes.link} to="/auth/user/signup">
                    {"Haven't signed up yet? Signup"}
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
