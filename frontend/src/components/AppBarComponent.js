import React from "react";
import { Typography, IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#333" : "#1976d2",
  color: theme.palette.text.primary,
  padding: "0.5em 1em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: theme.shadows[3],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.3rem",
  color: "white",
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  transition: "background-color 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function AppBarComponent({ darkMode, onThemeToggle }) {
  return (
    <StyledAppBar>
      <Title variant="h6">URL Shortener in GO</Title>
      <Tooltip
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <ThemeToggleButton color="inherit" onClick={onThemeToggle}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </ThemeToggleButton>
      </Tooltip>
    </StyledAppBar>
  );
}

export default AppBarComponent;
