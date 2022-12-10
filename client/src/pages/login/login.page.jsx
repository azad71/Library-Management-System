import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { UserType, PageTitles } from "../../constants/shared.constants";
import useStyles from "./login.styles";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/login.validation";
import { useDispatch } from "react-redux";
import { login } from "../../state/auth/auth.actions";

function LoginPage() {
  const [userType, setUserType] = useState(UserType.USER);
  const classes = useStyles();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      userType: UserType.USER,
    },
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (userType === UserType.USER) {
      document.title = PageTitles.USER_LOGIN;
    } else if (userType === UserType.ADMIN) {
      document.title = PageTitles.ADMIN_LOGIN;
    }
  }, [userType]);

  const handleUserTypeChange = (e) => {
    e.preventDefault();
    setUserType(e.target.value);
  };

  const onSubmit = (data) => {
    data.userType = userType;

    dispatch(login(data));
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
      <Link to={"/"}>
        <ArrowBackIcon />
      </Link>

      <Typography align="center" variant="h4" marginY={1}>
        Login
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
        <Box className={classes.loginFieldContainer}>
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

        <Box className={classes.loginFieldContainer}>
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

        <Box>
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
        </Box>

        <Typography marginY={1.5} textAlign={"right"} fontSize={12}>
          Don't have any account? <Link to={"/signup"}>Signup here</Link>
        </Typography>
      </form>
    </Container>
  );
}

export default LoginPage;
