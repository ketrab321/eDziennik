import firebase from "firebase/app";
import "firebase/database";

import { makeStyles } from "@material-ui/core/styles";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import { Button, getAccordionSummaryUtilityClass } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  chatSection: {
    width: "100%",
    height: "100%",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const CommunicationPanel = (props: { firebaseApp: any }) => {
  const chatsRef = props.firebaseApp.database().ref("chats");
  const forumsRef = props.firebaseApp.database().ref("forums");
  const usersRef = props.firebaseApp.database().ref("users");

  const [section, setSection] = useState("chats");
  const [activeConvoId, setActiveConvoId] = useState<string>("");
  const [activeForumId, setActiveForumId] = useState<string>("");

  const [chats, setChats] = useState<any[]>([]);
  const [forums, setForums] = useState<any[]>([]);
  const [users, setUsers] = useState<any>({});

  const userId = 123456;
  useEffect(() => {
    chatsRef.on("value", (snapshot: any) => {
      let tempChats: any[] = [];
      snapshot.forEach((childSnapshot: any) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        tempChats.push({
          id: childKey,
          data: childData,
        });
        if (activeConvoId === "") {
          setActiveConvoId(childKey);
        }
      });
      setChats(tempChats);
    });

    forumsRef.on("value", (snapshot: any) => {
      let tempForums: any[] = [];
      snapshot.forEach((childSnapshot: any) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        tempForums.push({
          id: childKey,
          data: childData,
        });
        if (activeForumId === "") {
          setActiveForumId(childKey);
        }
      });
      setForums(tempForums);
    });

    usersRef.once("value", (snapshot: any) => {
      let tempUsers: any = {};
      snapshot.forEach((childSnapshot: any) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        tempUsers[childKey] = childData;
      });
      setUsers(tempUsers);
    });
  }, []);

  function updateSection(newSection: string) {
    setSection(newSection);

    console.log(chats);
    console.log(forums);
    console.log(users);
  }

  function getConvoName(convo: any) {
    if (section === "chats") {
      console.log(convo);
      const convoUsers = convo.data.users.filter((n: any) => n);
      const convoUserId = convoUsers.find((item: number) => item !== userId);

      console.log();
      if (users[convoUserId]) {
        return `${users[convoUserId].name} ${users[convoUserId].surname}`;
      } else {
        return `${convoUserId}`;
      }
    } else {
      return convo.data.title;
    }
  }

  function setActiveId(id: string) {
    console.log("Set active id", id);
    if (section === "chats") {
      setActiveConvoId(id);
    } else {
      setActiveForumId(id);
    }
  }

  function getArray() {
    if (section === "chats") {
      return chats;
    } else {
      return forums;
    }
  }

  function getConvoData() {
    if (section === "chats") {
      console.log(activeConvoId);
      return chats.find((el) => (el.id = activeConvoId));
    } else {
      return forums.find((el) => (el.id = activeForumId));
    }
  }

  function getConvo() {
    const data = getConvoData();
    if (data) {
      return data.data.messages
        .filter((n: any) => n)
        .map((item: any) => {
          const messageUser = users[item.author];
          return (
            <ListItem key={`${item.date}`}>
              <List>
                {messageUser ? (
                  <ListItem key={`${item.author}${item.date}`}>
                    <ListItemIcon>
                      <Avatar>{messageUser.name.charAt(0)}</Avatar>
                    </ListItemIcon>
                    <ListItemText primary={messageUser.name}></ListItemText>
                  </ListItem>
                ) : null}

                <ListItem>
                  <ListItemText primary={item.text}></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText
                    secondary={new Date(item.date).toLocaleDateString()}
                  ></ListItemText>
                </ListItem>
              </List>
            </ListItem>
          );
        });
    }
    return null;
  }

  const classes = useStyles();

  return (
    <Box component={Paper}>
      <Grid container className={classes.buttons}>
        <Button
          variant="contained"
          onClick={() => {
            updateSection("chats");
          }}
        >
          Wiadomości
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            updateSection("forums");
          }}
        >
          Forum
        </Button>
      </Grid>
      <Grid container className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            {getArray().map((item: any) => {
              const convoName: string = getConvoName(item);
              return (
                <ListItem
                  button
                  key={item.id}
                  onClick={() => {
                    setActiveId(item.id);
                  }}
                >
                  <ListItemIcon>
                    <Avatar>{convoName.charAt(0)}</Avatar>
                  </ListItemIcon>
                  <ListItemText primary={convoName}>{convoName}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>{getConvo()}</List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1}>
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommunicationPanel;
