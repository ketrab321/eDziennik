import "firebase/database";

import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

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

const CommunicationPanel = (props: any) => {
  const chatsRef = props.firebaseApp.database().ref("chats");
  const forumsRef = props.firebaseApp.database().ref("forums");
  const usersRef = props.firebaseApp.database().ref("users");

  const [section, setSection] = useState("chats");
  const [activeConvoId, setActiveConvoId] = useState<string>("");
  const [activeForumId, setActiveForumId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [chats, setChats] = useState<any>({});
  const [forums, setForums] = useState<any>({});
  const [users, setUsers] = useState<any>({});

  const userId = props.user.id;

  useEffect(() => {
    usersRef.once("value", (snapshot: any) => {
      let tempUsers: any = {};
      snapshot.forEach((childSnapshot: any) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        tempUsers[childKey] = childData;
      });
      setUsers(tempUsers);
    });

    chatsRef.on("value", (snapshot: any) => {
      let tempChats: any = {};
      setChats(tempChats);
      snapshot.forEach((childSnapshot: any) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        console.log(childKey);
        tempChats[childKey] = {
          id: childKey,
          data: childData,
        };
        if (activeConvoId === "") {
          setActiveConvoId(childKey);
        }
      });
      setChats(tempChats);
    });

    forumsRef.on("value", (snapshot: any) => {
      let tempForums: any = {};
      setForums(tempForums);
      snapshot.forEach((childSnapshot: any) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        tempForums[childKey] = {
          id: childKey,
          data: childData,
        };
        if (activeForumId === "") {
          setActiveForumId(childKey);
        }
      });
      setForums(tempForums);
    });
  }, []);

  function updateSection(newSection: string) {
    setSection(newSection);
  }

  function getConvoName(convo: any) {
    if (section === "chats") {
      const convoUsers = convo.data.users.filter((n: any) => n);
      const convoUserId = convoUsers.find((item: number) => item !== userId);

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
    if (section === "chats") {
      setActiveConvoId(id);
    } else {
      setActiveForumId(id);
    }
  }

  function getArray() {
    if (section === "chats") {
      return Object.values(chats);
    } else {
      return Object.values(forums);
    }
  }

  function getConvoData() {
    if (section === "chats") {
      for (var id in chats) {
        if (id === activeConvoId) {
          return chats[id];
        }
      }
    } else {
      for (var id in forums) {
        if (id === activeForumId) {
          return forums[id];
        }
      }
    }
  }

  function getConvo() {
    const data = getConvoData();
    if (data) {
      let trueData = [];
      if (typeof data.data.messages === "object") {
        trueData = Object.values(data.data.messages);
      } else {
        trueData = data.data.messages;
      }

      return trueData
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
                    secondary={new Date(item.date).toLocaleString()}
                  ></ListItemText>
                </ListItem>
              </List>
            </ListItem>
          );
        });
    }
    return null;
  }

  function getConvoList() {
    let array = getArray();
    return (
      <List key="convo-lists">
        {array.map((item: any) => {
          const convoName: string = getConvoName(item);
          let active = false;
          if (section === "chats") {
            active = item.id === activeConvoId;
          } else {
            active = item.id === activeForumId;
          }

          const convoUsers = item.data.users.filter((n: any) => n);
          const convoUserId = convoUsers.find(
            (convoUserId: number) => convoUserId === userId
          );
          if (!convoUserId) {
            return null;
          }

          return (
            <ListItem
              button
              selected={active}
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
    );
  }

  function sendMessage() {
    console.log(message);
    if (section === "chats") {
      const messageRef = props.firebaseApp
        .database()
        .ref("chats/" + activeConvoId + "/messages")
        .push();
      messageRef.set({
        date: new Date().toISOString(),
        text: message,
        author: userId,
      });
    } else {
      const messageRef = props.firebaseApp
        .database()
        .ref("forums/" + activeForumId + "/messages")
        .push();
      messageRef.set({
        date: new Date().toISOString(),
        text: message,
        author: userId,
      });
    }

    setMessage("");
  }

  function onInputMessage(event: any) {
    setMessage(event.target.value);
  }

  const classes = useStyles();

  return (
    <Box component={Paper}>
      <Grid container className={classes.buttons}>
        <Button
          variant={section === "chats" ? "contained" : "outlined"}
          onClick={() => {
            updateSection("chats");
          }}
        >
          Wiadomości
        </Button>
        <Button
          variant={section === "forums" ? "contained" : "outlined"}
          onClick={() => {
            updateSection("forums");
          }}
        >
          Forum
        </Button>
      </Grid>
      <Grid container className={classes.chatSection}>
        <Grid
          key="convo-list-grid"
          item
          xs={3}
          className={classes.borderRight500}
        >
          {getConvoList()}
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>{getConvo()}</List>
          <Divider />
          <Grid container>
            <Grid item xs={11}>
              <TextField
                id="message"
                label="Type Something"
                value={message}
                fullWidth
                onChange={onInputMessage}
              />
            </Grid>
            <Grid item xs={1}>
              <Fab onClick={sendMessage} color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CommunicationPanel);
