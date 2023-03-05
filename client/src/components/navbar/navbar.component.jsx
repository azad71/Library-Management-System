import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";
import { getDrawerSideBarLinks, getNavbarSidebarLinks } from "./navbar.helper";
import { useNavigate } from "react-router-dom";
import { logout } from "../../state/auth/auth.slice";
import { useDispatch } from "react-redux";
import {
  homeButton,
  homeButtonLinkStyle,
  navbarDrawerContainer,
} from "./navbar.styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { UserType } from "../../constants/shared.constants";

export default function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuth, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getRedirectUrl = () => {
    if (isAuth) {
      if (userInfo.userType === UserType.USER) return "/dashboard/user";
      else if (userInfo.userType === UserType.ADMIN) return "/dashboard/admin";
    }
    return "/";
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2 }}>
        <Link style={{ ...homeButtonLinkStyle }} to={getRedirectUrl()}>
          Home
        </Link>
      </Box>

      <Divider />
      <List>{getDrawerSideBarLinks(isAuth, userInfo, handleLogout)}</List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleAuthNavigation = (path) => navigate(path);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link style={{ ...homeButton }} to={getRedirectUrl()}>
            Home
          </Link>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {getNavbarSidebarLinks(
              isAuth,
              userInfo,
              handleLogout,
              handleAuthNavigation
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{ ...navbarDrawerContainer }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
