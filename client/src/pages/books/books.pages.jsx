import { useState } from "react";
import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Badge from "@mui/material/Badge";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { Link } from "react-router-dom";

import navigationStyles from "../../styles/navigation.styles";
import { Button, Fade, Menu, MenuItem } from "@mui/material";

export default function PrimarySearchAppBar() {
  const classes = navigationStyles();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpenNotification = (event) => setAnchorEl(event.currentTarget);
  const handleCloseNotification = () => setAnchorEl(null);

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
              <IconButton
                aria-controls="fade-menu"
                aria-haspopup="true"
                aria-label="show 2 new notifications"
                color="inherit"
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpenNotification}
              >
                <Badge badgeContent={2} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                PaperProps={{
                  style: {
                    padding: "5px 5px 5px 0",
                  },
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseNotification}
                TransitionComponent={Fade}
              >
                <MenuItem divider>Your book return is due</MenuItem>
                <MenuItem divider>Azad commented on your post</MenuItem>
                <MenuItem divider>New books arrived</MenuItem>
                <MenuItem divider>New books arrived</MenuItem>
                <MenuItem divider>New books arrived</MenuItem>
                <MenuItem divider>New books arrived</MenuItem>
                <SeeMoreButtonContainer>
                  <Button variant="text" color="primary">
                    See more...
                  </Button>
                </SeeMoreButtonContainer>
              </Menu>

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
    </div>
  );
}

const SeeMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding-top: 5;
  padding-bottom: 0;
`;
