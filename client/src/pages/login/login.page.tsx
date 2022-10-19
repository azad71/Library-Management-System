import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { loginUserType } from "../../constants/shared.constants";
import useStyles from "./login.styles";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: string) {
  return {
    id: `${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

function LoginPage() {
  const [value, setValue] = useState(0);

  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  const UserLoginForm = () => (
    <form>
      <Box className={classes.userLoginFieldContainer}>
        <TextField
          fullWidth
          defaultValue=""
          label="Email"
          required
          id="user-email"
          type="email"
        />
      </Box>

      <Box className={classes.userLoginFieldContainer}>
        <TextField
          fullWidth
          label="Password"
          required
          id="user-password"
          type="password"
          defaultValue=""
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
  );

  return (
    <Container maxWidth="sm">
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="User" {...a11yProps(loginUserType.USER)} />
            <Tab label="Admin" {...a11yProps(loginUserType.ADMIN)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UserLoginForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Admin Login
        </TabPanel>
      </Box>
    </Container>
  );
}

export default LoginPage;
