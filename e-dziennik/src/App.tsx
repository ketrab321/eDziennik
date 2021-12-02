import { createTheme, ThemeProvider } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import React, { useState } from "react";
import "./App.css";
import BasicTabs from "./BasicTabs";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});

function App() {
  const [tab, setTab] = useState(1);
  const handleChange = (tab: number) => {
    setTab(tab);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BasicTabs />
      </div>
    </ThemeProvider>
  );
}

export default App;
