import { Card, CardContent, Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./mainPage.css";
import { deepOrange, deepPurple } from "@mui/material/colors";

var infos = [
  {
    img: "MM",
    name: "Małgorzata Michalczyk",
    date: "15.01.2022",
    content:
      "Egzamin maturalny.\nW związku z pandemią proszę pamiętać o zabraniu ze sobą środków ochrony osobistej na próbny egzamin maturalny. Szczegółowe informacje na temat egzaminu i obostrzeń obowiązujących związanych z pandemią znajdą państwo na stronie szkoły.",
  },
  {
    img: "JK",
    name: "Jan Kowalski",
    date: "02.12.2021",
    content:
      "Dzień dobry wszystkim, w dniu dzisiejszym zajęcia z matematyki zostały odwołane z przyczyn chorobowych. Dodatkowe zadania do zrobienia w domu prześlę państwu na maila.",
  },
];
var nrStudent = 21;
var nrHappy = 16;

function makeCardsfromInfo() {
  return infos.map((info) => (
    <Card className="infoCard">
      <div className="outerBox">
        <div>
          <Avatar sx={{ bgcolor: deepOrange[500] }} className="avatar">
            {info.img}
          </Avatar>
        </div>
        <div>
          <Typography variant="h6" className="cardText">
            {info.name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            className="cardText"
          >
            {info.date}
          </Typography>
        </div>
      </div>
      <CardContent className="mainContent">{info.content}</CardContent>
    </Card>
  ));
}

export default function MainPage() {
  return (
    <Box>
      <div className="numbers">
        <div className="number">
          <p>Twój numer w dzienniku </p>
          <p className="numberFont">{nrStudent}</p>
        </div>
        <div className="number">
          <p>Szczęśliwy numerek </p>
          <p className="numberFont">{nrHappy}</p>
        </div>
      </div>
      <div className="infoSign">
        <h2>Informacje </h2>
      </div>
      <div className="infos">{makeCardsfromInfo()}</div>
    </Box>
  );
}
