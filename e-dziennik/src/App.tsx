import React, { useState } from "react";
import "./App.css";
import BasicTabs from "./BasicTabs";

function App() {
  const [tab, setTab] = useState(1);
  const handleChange = (tab: number) => {
    setTab(tab);
  };
  return (
    <div className="App">
      <BasicTabs />
    </div>
  );
}

export default App;
