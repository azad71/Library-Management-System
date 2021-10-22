import { Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import userSignupValidationSchema from "../../../validations/auth/userSignup.validator";

import useStyles from "../../../styles/auth.styles";

const inputProps = {
  variant: "outlined",
  margin: "dense",
  required: true,
  fullWidth: true,
  autoFocus: true,
};

export default function UserSignup() {
  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserSignup = (values, actions) => {
    alert(JSON.stringify(values));
    actions.resetForm({});
    actions.setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Signup
        </Typography>

        <Formik
          initialValues={{ ...values }}
          onSubmit={(values, actions) => handleUserSignup(values, actions)}
          validationSchema={userSignupValidationSchema}
          validateOnBlur={false}
        >
          {({ handleChange, values, handleSubmit, errors, isSubmitting, touched, setFieldTouched }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...inputProps}
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    value={values.firstName}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("firstName");
                    }}
                  />
                  <p className={classes.errorText}>{touched.firstName && errors.firstName}</p>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    {...inputProps}
                    id="lastName"
                    label="last Name"
                    name="lastName"
                    autoComplete="lastName"
                    value={values.lastName}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("lastName");
                    }}
                  />
                  <p className={classes.errorText}>{touched.lastName && errors.lastName}</p>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    {...inputProps}
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={values.username}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("username");
                    }}
                  />
                  <p className={classes.errorText}>{touched.username && errors.username}</p>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    {...inputProps}
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("email");
                    }}
                  />
                  <p className={classes.errorText}>{touched.email && errors.email}</p>
                </Grid>

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
                  <TextField
                    {...inputProps}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("confirmPassword");
                    }}
                  />

                  <p className={classes.errorText}>{touched.confirmPassword && errors.confirmPassword}</p>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    {...inputProps}
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    value={values.address}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("address");
                    }}
                  />
                  <p className={classes.errorText}>{touched.address && errors.address}</p>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender"
                      value={values.gender}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldTouched("gender");
                      }}
                    >
                      <FormControlLabel
                        checked={values.gender === "female"}
                        value="female"
                        control={<Radio color="primary" />}
                        label="Female"
                      />
                      <FormControlLabel
                        checked={values.gender === "male"}
                        value="male"
                        control={<Radio color="primary" />}
                        label="Male"
                      />
                      <FormControlLabel
                        checked={values.gender === "other"}
                        value="other"
                        control={<Radio color="primary" />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  <p className={classes.errorText}>{touched.gender && errors.gender}</p>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 1, mb: 2 }}>
                    {isSubmitting ? "Signup..." : "Signup"}
                  </Button>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs>
                  <Link className={classes.link} to="/">
                    Home
                  </Link>
                </Grid>
                <Grid item>
                  <Link className={classes.link} to="/auth/user/login">
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
