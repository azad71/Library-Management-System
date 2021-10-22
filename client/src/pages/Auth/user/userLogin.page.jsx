import { Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import loginValidationSchema from "../../../validations/auth/login.validator";

import useStyles from "../../../styles/auth.styles";

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

  const handleUserLogin = (values, actions) => {
    alert(JSON.stringify(values));
    actions.resetForm({});
    actions.setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Login
        </Typography>

        <Formik
          initialValues={{ ...values }}
          onSubmit={(values, actions) => handleUserLogin(values, actions)}
          validationSchema={loginValidationSchema}
          validateOnBlur={false}
        >
          {({ handleChange, values, handleSubmit, errors, isSubmitting, touched, setFieldTouched }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
                  <TextField
                    {...inputProps}
                    id="username"
                    label="Username"
                    name="username"
                    placeholder="Provide email or username"
                    autoComplete="username"
                    value={values.username}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("username");
                    }}
                  />
                  <p className={classes.errorText}>{touched.username && errors.username}</p>
                </Grid>

                <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
                  <TextField
                    {...inputProps}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    value={values.password}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("password");
                    }}
                  />

                  <p className={classes.errorText}>{touched.password && errors.password}</p>
                </Grid>

                <Grid item sm={12} xs={12} sx={{ mb: 2 }}>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSubmitting ? "Signup..." : "Signup"}
                  </Button>
                </Grid>
              </Grid>

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
