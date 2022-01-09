import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { setLoggedUser } from "../redux/actions/setLoggedUser";
import { Label } from "@material-ui/icons";
import { Alert } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        eDziennik
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function SignIn(props: any) {
  const usersRef = props.firebaseApp.database().ref("users");
  const [users, setUsers] = useState<any>({});
  const [showWarningMessage, setShowWarningMessage] = useState<boolean>(false);

  useEffect(() => {
    usersRef.once("value", (snapshot: any) => {
      let tempUsers: any = {};
      snapshot.forEach((childSnapshot: any) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        tempUsers[childKey] = {
          id: parseInt(childKey),
          ...childData,
        };
      });
      setUsers(tempUsers);
    });
  }, []);
  const classes = useStyles();
  const [signInState, setSignInState] = useState<{
    login: string;
    password: string;
  }>({
    login: "",
    password: "",
  });

  const handleChange = (name: "login" | "password", event: any) => {
    let newState = { ...signInState };
    if (name === "login") {
      newState.login = event.target.value;
    } else {
      newState.password = event.target.value;
    }
    setSignInState(newState);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Sign in state:", signInState);
    console.log("Users", users);
    let userFound = null;
    for (var userId in users) {
      let tempUser = users[userId];

      if (
        tempUser.login === signInState.login &&
        tempUser.password === signInState.password
      ) {
        userFound = tempUser;
        break;
      }
    }
    if (userFound !== null) {
      props.setLoggedUser(userFound);
    } else {
      setShowWarningMessage(true);
    }
    console.log("Found user", userFound);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logowanie
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {showWarningMessage ? (
            <Alert severity="error">Niepoprawny login lub hasło</Alert>
          ) : (
            <></>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Login"
            name="login"
            autoComplete="login"
            autoFocus
            value={signInState.login}
            onChange={(event: any) => {
              handleChange("login", event);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            value={signInState.password}
            onChange={(event: any) => {
              handleChange("password", event);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Zapamiętaj mnie"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Zaloguj
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  setLoggedUser: setLoggedUser,
})(SignIn);
