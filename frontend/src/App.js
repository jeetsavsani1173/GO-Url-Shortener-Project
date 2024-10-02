import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import AppBarComponent from "./components/AppBarComponent";
import FormComponent from "./components/FormComponent";
import ResultComponent from "./components/ResultComponent";
import { Box } from "@mui/material";

function App() {
  const [url, setUrl] = useState("");
  const [customShortName, setCustomShortName] = useState("");
  const [useCustomShortName, setUseCustomShortName] = useState(false);
  const [response, setResponse] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleSubmit = async (url, customShortName, useCustomShortName) => {
    const requestBody = useCustomShortName
      ? { url, short: customShortName }
      : { url };

    try {
      const res = await axios.post("http://localhost:8080/api/v1", requestBody);
      setResponse(res.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(JSON.parse(error?.request?.response)?.message);
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="scroll-container">
      <ThemeProvider
        theme={darkMode ? darkTheme : lightTheme}
        className="scrollable-container"
      >
        <AppBarComponent
          darkMode={darkMode}
          onThemeToggle={handleThemeToggle}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            minHeight: "calc(100vh - 57px)",
            padding: 12,
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <FormComponent
            url={url}
            setUrl={setUrl}
            customShortName={customShortName}
            setCustomShortName={setCustomShortName}
            useCustomShortName={useCustomShortName}
            setUseCustomShortName={setUseCustomShortName}
            onSubmit={handleSubmit}
          />
          {(response || errorMessage) && (
            <ResultComponent response={response} errorMessage={errorMessage} />
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
