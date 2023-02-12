import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useStyles from "./signup.styles";

import { UserType, PageTitles } from "../../constants/shared.constants";
import { signupSchema } from "../../validations/signup.validation";

function SignupPage() {
  const [userType, setUserType] = useState(UserType.USER);
  const classes = useStyles();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: UserType.USER,
    },
    resolver: yupResolver(signupSchema),
  });

  useEffect(() => {
    if (userType === UserType.USER) {
      document.title = PageTitles.USER_SIGNUP;
    } else if (userType === UserType.ADMIN) {
      document.title = PageTitles.ADMIN_SIGNUP;
    }
  }, [userType]);

  const handleUserTypeChange = (e) => {
    e.preventDefault();
    setUserType(e.target.value);
  };

  const onSubmit = (data) => {
    data.userType = userType;

    reset();
    setUserType(UserType.USER);

    let url = "/dashboard/user";
    if (userType === UserType.ADMIN) {
      url = url.replace("user", "admin");
    }

    navigate(url);
  };

  return (
    <Container maxWidth="sm">
      <Link to="/">
        <ArrowBackIcon />
      </Link>

      <Typography align="center" variant="h4" marginY={1}>
        Signup
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="user-selection-radio-button-group"
              name="row-radio-buttons-group"
              onChange={handleUserTypeChange}
            >
              <FormControlLabel
                checked={userType === UserType.USER}
                value={UserType.USER}
                control={<Radio />}
                label={UserType.USER}
              />
              <FormControlLabel
                checked={userType === UserType.ADMIN}
                value={UserType.ADMIN}
                control={<Radio />}
                label={UserType.ADMIN}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className={classes.signupFieldContainer}>
          <TextField
            fullWidth
            label="Name"
            type="text"
            inputProps={{
              ...register("name"),
            }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>

        <Box className={classes.signupFieldContainer}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            inputProps={{
              ...register("email"),
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>

        <Box className={classes.signupFieldContainer}>
          <TextField
            fullWidth
            label="Address"
            type="text"
            inputProps={{
              ...register("address"),
            }}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Box>

        <Box className={classes.signupFieldContainer}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            inputProps={{
              ...register("password"),
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>

        <Box className={classes.signupFieldContainer}>
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            inputProps={{
              ...register("confirmPassword"),
            }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Box>

        <Box>
          <Button type="submit" fullWidth variant="contained">
            Signup
          </Button>
        </Box>

        <Typography marginY={1.5} textAlign={"right"} fontSize={12}>
          Already have an account? <Link to={"/login"}>Login </Link>
        </Typography>
      </form>
    </Container>
  );
}

export default SignupPage;
