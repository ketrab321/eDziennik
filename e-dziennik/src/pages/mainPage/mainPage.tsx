import { Card, CardContent, Avatar, Typography} from "@mui/material";
import { Box } from "@mui/system";
import "./mainPage.css";
import { deepOrange, deepPurple } from '@mui/material/colors';

var infos = [{img:"NN", name: "Jan Kowalski", date:"02.12.2021", content:"Główna treść informacji" }];
var nrStudent = 21;
var nrHappy = 16;

function makeCardsfromInfo()
{
  return infos.map(info =>
    <Card className="infoCard">
      <div className="outerBox">
        <div>
        <Avatar sx={{ bgcolor: deepOrange[500] }} className="avatar">
          { info.img}
        </Avatar>
        </div>
        <div >
        <Typography variant="h6" className="cardText">
          {info.name}
        </Typography>
        <Typography  variant="subtitle2" color="text.secondary" className="cardText">
          { info.date}
        </Typography>
        </div>
        </div>
      <CardContent className="mainContent">
        {info.content}
      </CardContent>
    </Card>)
}

export default function MainPage() {
  return <Box>
    <div className="numbers">
     <div className="number">
      <p>Twój numer w dzienniku </p>
        <p>{ nrStudent}</p>
    </div>
    <div className="number">
      <p>Szczęśliwy numerek </p>
        <p>{ nrHappy}</p>
    </div>
    </div>
    <div className="infoSign">
      <h2>Informacje </h2>
    </div>
    <div>
      {makeCardsfromInfo()}
    </div>
  </Box>;
}
