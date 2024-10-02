import React from "react";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Snackbar,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const StyledErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200],
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
  marginTop: theme.spacing(2),
  boxShadow: theme.shadows[2],
  fontWeight: "500",
  animation: "fadeIn 0.3s ease-in-out",
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  marginTop: theme.spacing(2),
}));

const UrlText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "underline",
  cursor: "pointer",
  marginBottom: theme.spacing(1),
}));

const ExpiryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

function ResultComponent({ response, errorMessage }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response.short);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedirect = () => {
    window.open("http://" + response?.short, "_blank");
  };

  return (
    <Box sx={{ marginTop: 4, textAlign: "center", color: "text.primary" }}>
      {!errorMessage ? (
        <Container>
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            sx={{ mb: 2 }}
          >
            Shorten URL Details
          </Typography>
          <UrlText variant="h6" sx={{ mb: 2 }}>
            {response?.short}
            <Tooltip title="Copy URL">
              <IconButton onClick={handleCopy} size="small">
                <ContentCopyIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Tooltip>
          </UrlText>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRedirect}
            sx={{ mb: 2 }}
          >
            Redirect to URL
          </Button>
          <ExpiryText variant="body2">
            Expiry: {response?.expiry} hours
          </ExpiryText>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="URL copied to clipboard"
          />
        </Container>
      ) : (
        <StyledErrorMessage variant="body1">{errorMessage}</StyledErrorMessage>
      )}
    </Box>
  );
}

export default ResultComponent;
