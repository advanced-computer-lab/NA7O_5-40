import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppContext, useAuthContext } from "../Context";

// const pages = ['Reservations'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {
  const { setIsLoggedIn, isLoggedIn } = useAuthContext();

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            GUC Airways
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key={"Home"}>
                <Link to="/home">Home</Link>
              </MenuItem>
              <MenuItem key={"reservations"}>
                <Link to="/user/reservations">Reservation</Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            GUC Airways
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="home"
              onClick={() => {
                navigate("/home");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>

            {
              isLoggedIn ? (
                <Button
                  key="profile"
                  onClick={() => {
                    navigate("/user/edit");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Profile
                </Button>
              ) : (
                <></>
              )
            }

            {
              isLoggedIn ?
                (
                  <Button
                    key="reservations"
                    onClick={() => {
                      navigate("/user/reservations");
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Reservations
                  </Button>
                ) :
                (<></>)
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>


            {isLoggedIn ?
              (
                <Button
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData')
                    navigate("/");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Logout
                </Button>
              )
              :
              <Button
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem('token');
                  localStorage.removeItem('userData')
                  navigate("/");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            }
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
