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
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import userSignupValidationSchema from "../../../validations/auth/userSignup.validator";

import useStyles from "../admin/adminSignup.styles";

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

  const [gender, setGender] = useState("");

  const handleSubmit = (values, actions) => {
    console.log(values);
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Signup
        </Typography>

        <Formik
          initialValues={{ ...values }}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validationSchema={userSignupValidationSchema}
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.input}>
                    <TextField
                      {...inputProps}
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="firstName"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldTouched("firstName");
                      }}
                    />
                    <p className={classes.errorText}>{touched.firstName && errors.firstName}</p>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div className={classes.input}>
                    <TextField
                      {...inputProps}
                      id="lastName"
                      label="last Name"
                      name="lastName"
                      autoComplete="lastName"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldTouched("lastName");
                      }}
                    />
                    <p className={classes.errorText}>{touched.lastName && errors.lastName}</p>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>

                <Grid item xs={12} sm={12}>
                  <div className={classes.input}>
                    <TextField
                      {...inputProps}
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="address"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldTouched("address");
                      }}
                    />
                    <p className={classes.errorText}>{touched.address && errors.address}</p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={handleChangeGender}>
                      <FormControlLabel
                        checked={gender === "female"}
                        value="female"
                        control={<Radio color="primary" />}
                        label="Female"
                      />
                      <FormControlLabel
                        checked={gender === "male"}
                        value="male"
                        control={<Radio color="primary" />}
                        label="Male"
                      />
                      <FormControlLabel
                        checked={gender === "other"}
                        value="other"
                        control={<Radio color="primary" />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  <p className={classes.errorText}>{touched.gender && errors.gender}</p>
                </Grid>
              </Grid>

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Signup
              </Button>
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
