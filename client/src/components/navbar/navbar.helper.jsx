import { Fragment } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { getFullName } from "../../utils/getFullName.util";
import { navbarButtonStyles } from "./navbar.styles";
import Button from "@mui/material/Button";

export const getDrawerSideBarLinks = (isAuth, userInfo, handleLogout) =>
  isAuth ? (
    <Fragment>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <ListItemText
            secondary={`Logged in as ${getFullName(
              userInfo?.firstName,
              userInfo?.lastName
            )}`}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <ListItemText onClick={handleLogout} secondary={`Logout`} />
        </ListItemButton>
      </ListItem>
    </Fragment>
  ) : (
    <Fragment>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <ListItemText secondary={"Signup"} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <ListItemText secondary={"Login"} />
        </ListItemButton>
      </ListItem>
    </Fragment>
  );

export const getNavbarSidebarLinks = (isAuth, userInfo, handleLogout) =>
  isAuth ? (
    <Fragment>
      <Button sx={{ ...navbarButtonStyles }}>
        Logged in as {getFullName(userInfo?.firstName, userInfo?.lastName)}
      </Button>
      <Button onClick={handleLogout} sx={{ ...navbarButtonStyles }}>
        Logout
      </Button>
    </Fragment>
  ) : (
    <Fragment>
      <Button sx={{ ...navbarButtonStyles }}>Signup</Button>
      <Button sx={{ ...navbarButtonStyles }}>Login</Button>
    </Fragment>
  );
