import React, { useState, useEffect } from "react";
import { Typography, IconButton, Avatar, Box } from "..";
import { AppBar, Menu, MenuItem, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { calculateDuration } from "../../utils/core";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context";

const Header = () => {
  const [openMenu, setMenuOpen] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();
  const { translate } = useAppContext();


  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const storedName = profile.name || translate("your-baby");
    const storedAge = Math.floor(calculateDuration(profile.birth, "day")) || 0;
    setName(storedName);
    setAge(storedAge);
  }, []);

  const open = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const close = () => {
    setMenuOpen(null);
  };

  const handleNavigation = (route) => {
    navigate(route);
    close();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "secondary.main", padding: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={name} sx={{ width: 56, height: 56, marginRight: 2 }} />
          <Box>
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2">{age} {translate("days")}</Typography>
          </Box>
        </Box>

        <IconButton color="inherit" onClick={open}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={openMenu}
          open={Boolean(openMenu)}
          onClose={close}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={() => handleNavigation("/")}>Home</MenuItem>
          <MenuItem onClick={() => handleNavigation("/dashboard")}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => handleNavigation("/settings")}>
            {translate("settings")}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
