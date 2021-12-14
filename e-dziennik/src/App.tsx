import { createTheme, ThemeProvider } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import React, { useState } from "react";
import "./App.css";
import BasicTabs from "./BasicTabs";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyBLvl7BlGHCvJL0uzJdmflzAY8PKzfUkoE",
  authDomain: "edziennik-777d2.firebaseapp.com",
  databaseURL:
    "https://edziennik-777d2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "edziennik-777d2",
  storageBucket: "edziennik-777d2.appspot.com",
  messagingSenderId: "331344377233",
  appId: "1:331344377233:web:70484e778b172c275dd630",
};

const firebaseApp = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [tab, setTab] = useState(1);
  const handleChange = (tab: number) => {
    setTab(tab);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BasicTabs firebaseApp={firebaseApp} />
      </div>
    </ThemeProvider>
  );
}

export default App;
