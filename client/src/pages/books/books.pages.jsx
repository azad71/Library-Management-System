import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Badge from "@mui/material/Badge";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { Link } from "react-router-dom";

import navigationStyles from "../../styles/navigation.styles";

export default function PrimarySearchAppBar() {
  const classes = navigationStyles();

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link className={classes.title} to={isAuthenticated ? "/dashboard" : "/"}>
            <Typography variant="h6" noWrap>
              Home
            </Typography>
          </Link>

          <div className={classes.grow} />

          {isAuthenticated ? (
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={2} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Link className={classes.links} to="/">
                Logout
              </Link>
            </div>
          ) : (
            <Link className={classes.links} to={isAuthenticated ? "/dashboard" : "/"}>
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {}
    </div>
  );
}
