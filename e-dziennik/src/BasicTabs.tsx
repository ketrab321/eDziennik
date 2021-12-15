import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import React from "react";
import {
  AccountSettings,
  Attendance,
  Communication,
  Grades,
  LessonPlan,
  MainPage,
} from "./pages";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Looks5Icon from "@mui/icons-material/Looks5";
import ChatIcon from "@mui/icons-material/Chat";
import useWindowDimensions from "./useWindowDimensions";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props: { firebaseApp: any }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const selectAccountSettings = () => {
    setValue(5);
  };

  const { height, width } = useWindowDimensions(); // TODO: Extract some variable to redux, some boolean that indicates if we are on mobile

  let mobile = false;
  if (width < 850) {
    mobile = true;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<HomeIcon />}
            iconPosition="start"
            label={mobile ? "" : "Strona główna"}
            {...a11yProps(0)}
          />
          <Tab
            icon={<ListAltIcon />}
            iconPosition="start"
            label={mobile ? "" : "Plan lekcji"}
            {...a11yProps(1)}
          />
          <Tab
            icon={<PlaylistAddCheckIcon />}
            iconPosition="start"
            label={mobile ? "" : "Obecność"}
            {...a11yProps(2)}
          />
          <Tab
            icon={<Looks5Icon />}
            iconPosition="start"
            label={mobile ? "" : "Oceny"}
            {...a11yProps(3)}
          />
          <Tab
            icon={
              <Badge badgeContent={4} color="secondary">
                <ChatIcon />
              </Badge>
            }
            iconPosition="start"
            label={mobile ? "" : "Wiadomości"}
            {...a11yProps(4)}
          />
          <Tooltip
            onClick={selectAccountSettings}
            role="tab"
            title="Ustawienia konta"
            style={{
              marginLeft: "auto",
              marginRight: "15px",
            }}
            {...a11yProps(5)}
          >
            <IconButton disableRipple={true} size="small" sx={{ ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MainPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LessonPlan />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Attendance />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grades />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Communication firebaseApp={props.firebaseApp} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AccountSettings />
      </TabPanel>
    </Box>
  );
}
