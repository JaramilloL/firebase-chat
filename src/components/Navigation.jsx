import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import NavList from "./NavList";
import { useState } from "react";

const Navigation = () => {
  //creamos un estado para la variable de open o close
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "block", sm: "none" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              App
            </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <NavLink to="/">
              <Button sx={{ color: "#fff" }}>Login</Button>
            </NavLink>
            <NavLink to="/register">
              <Button sx={{ color: "#fff" }}>Register</Button>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <NavList onClick={() => setOpen(false)} />
      </Drawer>
    </Box>
  );
};

export default Navigation;
