import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import "./circle.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const rows = [
  {
    name: "Język Polski",
    grades: [
      {
        value: "5",
        weight: 5,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
      {
        value: "3",
        weight: 2,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
      {
        value: "3",
        weight: 1,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
      {
        value: "3",
        weight: 4,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
      {
        value: "4",
        weight: 6,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
    ],
  },
  {
    name: "Matematyka",
    grades: [
      {
        value: "5",
        weight: 5,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
      {
        value: "3",
        weight: 2,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
      {
        value: "3",
        weight: 1,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
      {
        value: "3",
        weight: 4,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
      {
        value: "4",
        weight: 6,
        title: "Sprawdzian",
        description: "Opis opis opis",
        date: "2011-10-05T14:48:00.000Z",
      },
    ],
  },
];

export default function GradesTable() {
  const [open, setOpen] = React.useState(false);
  const [biggestWeight, setBiggestWeight] = React.useState(1);
  const [weights, setWeights] = React.useState<Array<number>>([]);
  const [grade, setGrade] = React.useState<any>({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleGradeClick = (item: object) => {
    setGrade(item);
    handleOpen();
  };

  React.useEffect(() => {
    let temp = 1;
    let tempArray: Array<number> = [];

    rows.forEach((row) => {
      row.grades.forEach((grade) => {
        console.log(grade);
        if (grade.weight > temp) {
          temp = grade.weight;
        }
        if (tempArray.indexOf(grade.weight) === -1) {
          tempArray.push(grade.weight);
        }
      });
    });
    setBiggestWeight(temp);
    setWeights(tempArray);
  }, []);

  const getDate = () => {
    let gradeDate = new Date(grade.date);
    return gradeDate.toLocaleString();
  };

  function hsl_col_perc(weight: number) {
    var percent = weight / biggestWeight;
    var b = 100 * percent;
    // Return a CSS HSL string
    return "hsl(" + b + ", 100%, 50%)";
  }

  const getAverage = (grades: Array<any>) => {
    let gradesSum = 0;
    let weightSum = 0;
    const gradeRegex = /[1-6]/g;
    grades.forEach((grade) => {
      const found = grade.value.match(gradeRegex);
      if (found.length > 0) {
        let gradeValue = parseInt(found[0]);
        if (grade.value.includes("--")) {
          gradeValue -= 0.5;
        } else if (grade.value.includes("++")) {
          gradeValue += 0.5;
        } else if (grade.value.includes("+")) {
          gradeValue += 0.33;
        } else if (grade.value.includes("-")) {
          gradeValue -= 0.33;
        }
        gradesSum += gradeValue * grade.weight;
        weightSum += grade.weight;
      }
    });

    return (gradesSum / weightSum).toFixed(2);
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tytuł oceny: {grade.title}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ocena: {grade.value}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Opis oceny: {grade.description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Waga oceny: {grade.weight}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Data oceny: {getDate()}
          </Typography>
          <Button fullWidth={true} onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Przedmiot</TableCell>
              <TableCell align="left">Oceny</TableCell>
              <TableCell align="left">Średnia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    {row.grades.map((item) => {
                      return (
                        <div
                          className="badge"
                          style={{
                            background: hsl_col_perc(item.weight),
                          }}
                          onClick={() => {
                            handleGradeClick(item);
                          }}
                        >
                          {item.value}
                        </div>
                      );
                    })}
                  </Stack>
                </TableCell>
                <TableCell component="th" scope="row">
                  {getAverage(row.grades)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "100px",
        }}
      >
        <Table sx={{ maxWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Waga oceny</TableCell>
              <TableCell align="left">Kolor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weights.sort().map((weight) => (
              <TableRow
                key={weight}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {weight}
                </TableCell>
                <TableCell align="right">
                  <div
                    className="badge"
                    style={{
                      background: hsl_col_perc(weight),
                    }}
                  ></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
