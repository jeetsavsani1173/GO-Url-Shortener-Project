import React from "react";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.dark,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.dark,
    },
  },
  "& .MuiInputBase-input": {
    color: theme.palette.text.primary,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  transition: "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: theme.palette.text.primary,
  textShadow: `
    2px 2px 4px ${theme.palette.mode === "dark" ? "#000" : "#aaa"},
    -1px -1px 2px ${theme.palette.mode === "dark" ? "#000" : "#aaa"}
  `,
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

function FormComponent({
  url,
  setUrl,
  customShortName,
  setCustomShortName,
  useCustomShortName,
  setUseCustomShortName,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url, customShortName, useCustomShortName);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 500,
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Heading variant="h4">URL Shortener in GO</Heading>
      <StyledTextField
        label="Long URL"
        placeholder="Enter your long URL here"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      {useCustomShortName && (
        <StyledTextField
          label="Custom Short Name"
          placeholder="Enter Custom Short Name"
          variant="outlined"
          fullWidth
          value={customShortName}
          onChange={(e) => setCustomShortName(e.target.value)}
          required
          sx={{ marginTop: 2 }}
        />
      )}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
        <StyledFormControlLabel
          control={
            <Checkbox
              checked={useCustomShortName}
              onChange={(e) => setUseCustomShortName(e.target.checked)}
            />
          }
          label="Use Custom Short Name"
          sx={{ flex: 1 }}
        />
      </Box>
      <StyledButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Shorten My URL
      </StyledButton>
    </Box>
  );
}

export default FormComponent;
