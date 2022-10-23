import { useState, useEffect, ChangeEvent } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { loginUserType, PageTitles } from "../../constants/shared.constants";
import useStyles from "./login.styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useForm } from "react-hook-form";
import { IUserLoginFormData } from "../../types/userLogin";
import {yupResolver} from '@hookform/resolvers/yup';
import { userLoginSchema } from "../../validations/userLogin.validation";

function LoginPage() {
  const [userType, setUserType] = useState(loginUserType.USER);
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IUserLoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      userType: loginUserType.USER,
    },
    resolver: yupResolver(userLoginSchema)
  });

  useEffect(() => {
    if (userType === loginUserType.USER) {
      document.title = PageTitles.USER_LOGIN;
    } else if (userType === loginUserType.ADMIN) {
      document.title = PageTitles.ADMIN_LOGIN;
    }
  }, [userType]);

  const handleUserTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserType(e.target.value);
  };

const onSubmit = (data: IUserLoginFormData) => {
  console.log(data);
}

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
                checked={userType === loginUserType.USER}
                value={loginUserType.USER}
                control={<Radio />}
                label={loginUserType.USER}
              />
              <FormControlLabel
                checked={userType === loginUserType.ADMIN}
                value={loginUserType.ADMIN}
                control={<Radio />}
                label={loginUserType.ADMIN}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className={classes.loginFieldContainer}>
          <TextField
            fullWidth
            label="Email"
            required
            id="user-email"
            type="email"
            {...register("email")}
          />
        </Box>

        <Box className={classes.loginFieldContainer}>
          <TextField
            fullWidth
            label="Password"
            required
            id="user-password"
            type="password"
            {...register("password")}
          />
        </Box>

        <Box>
          <Button fullWidth variant="contained">
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
