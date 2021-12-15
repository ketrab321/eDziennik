import { Box } from "@mui/system";
import { Card, Divider, List, ListItemButton, Collapse, ListItem, Button, IconButton, Typography } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';
import "./attendance.css";
import * as React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ExpandLess, ExpandMore } from '@mui/icons-material/';
import LinearProgress from '@mui/material/LinearProgress';

var columns = [
  { field: 'number', headerName: 'Nr', width: 50, editable: false, sortable:false, filterable:false  },
  { field: 'name', headerName: 'Name', width: 180, editable: false, sortable:false, filterable:false  },
  { field: "0", headerName: "0", width: 30, editable: true, sortable:false, filterable:false },
  { field: "1", headerName: "1", width: 30, editable: true,sortable:false, filterable:false  },
  { field: "2", headerName: "2", width: 30, editable: true,sortable:false, filterable:false  },
  { field: "3", headerName: "3", width: 30, editable: true,sortable:false, filterable:false  },
  { field: "4", headerName: "4", width: 30, editable: true,sortable:false, filterable:false  },
  { field: "5", headerName: "5", width: 30, editable: true,sortable:false, filterable:false  },
  { field: "6", headerName: "6", width: 30, editable: true,sortable:false, filterable:false  },
  { field: "7", headerName: "7", width: 30, editable: true, sortable:false, filterable:false  }

]

export default function Attendance() {

  
  const [dayOpened, setDayOpened] = React.useState("none");
  const [lineLoading, setLoading] = React.useState(false);


  const handleClickMonday = () => {
    if (dayOpened !== "mon")
      setDayOpened("mon");
    else
      setDayOpened("none");
  };
  const handleClickTuesday = () => {
    if (dayOpened !== "tue")
      setDayOpened("tue");
    else
      setDayOpened("none");
  };
  const handleClickWend = () => {
    if (dayOpened !== "wen")
    setDayOpened("wen");
  else
    setDayOpened("none");
  };
  const handleClickThursday = () => {
    if (dayOpened !== "th")
    setDayOpened("th");
  else
    setDayOpened("none");
  };
  const handleClickFriday = () => {
    if (dayOpened !== "fr")
    setDayOpened("fr");
  else
    setDayOpened("none");
  };

  const save = () => {
    setLoading(true);
    setTimeout(() => {  setLoading(false); }, 1500);
  }

  const cancel = () => {
    setTeachersFreq(class2);
  }
  var curr = new Date;
  var [firstDayOfWeek, setFirstDayOfWeek] = React.useState( new Date(curr.setDate(curr.getDate() - curr.getDay()+1)));
  var [lastDayOfWeek, setLastDayOfWeek] = React.useState (new Date(curr.setDate(curr.getDate() - curr.getDay()+5)));

  console.log(firstDayOfWeek.toLocaleString("pl-PL"));
  
  
  const previousWeek = () => {
    var newDate = new Date(firstDayOfWeek.setDate((firstDayOfWeek.getDate() - 7)));
    setFirstDayOfWeek(newDate);
    newDate = new Date(lastDayOfWeek.setDate((lastDayOfWeek.getDate() - 7)));
    setLastDayOfWeek(newDate);
  }

  const nextWeek = () => {
    var newDate = new Date(firstDayOfWeek.setDate((firstDayOfWeek.getDate() + 7)));
    setFirstDayOfWeek(newDate);
    newDate = new Date(lastDayOfWeek.setDate((lastDayOfWeek.getDate() + 7)));
    setLastDayOfWeek(newDate);
  };
  const [class1, setClass1] = React.useState([
    { id: 1, number: "16", name: "Adam Nowak", 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
    { id: 2, number: "21", name: "Adam Wiśniewski", 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" }
  
  ]);

  const [class2, setClass2] = React.useState([
    { id: 1, number: "16", name: "Adam Nowak", 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
    { id: 2, number: "17", name: "Adam Kowalski", 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" }
  
  ]);

  const clickedLesson = () => {
    setTeachersFreq(class2)
  };
  const [teachersFreq, setTeachersFreq] = React.useState(class1); 


var teachersClasses = [["", "5A", "7B", "7B", "6A", "5B", "6C"], ["", "8A", "6B", "7A", "", "5C", "6D"],["", "8A", "6B", "7A", "", "5C", "6D"],["", "8A", "6B", "7A", "", "5C", "6D"],["", "8A", "6B", "7A", "", "5C", "6D"]];
const [days, setDays] = React.useState( ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"]);
  

  function renderRow( day:string, key:number )
  {
    return <ListItemButton className="classItem" onClick={clickedLesson}>    
    <ListItemText className="classItemText" primary={key+'. '+day} />
  </ListItemButton>
  }

var studentsFreq
function createTableTeacher()
{
 return <div className="Freq">
   <DataGrid rows={teachersFreq}columns={columns} rowsPerPageOptions={[]} getCellClassName={(params) => {
     return "cell"
   }}
     disableColumnMenu={true}
     disableDensitySelector={false} />
   
</div>
}

  return <Box>
    <div className="dateCard">
    <Card >
      <div>
          <IconButton onClick={ previousWeek}>
            <ArrowBackIosIcon />
          </IconButton>
         {firstDayOfWeek.toLocaleString("pl-PL").split(',')[0]} - { lastDayOfWeek.toLocaleString("pl-PL").split(',')[0]}
          <IconButton onClick={ nextWeek}>
            <ArrowForwardIosIcon/>
            </IconButton>
        </div>
        <Divider />
        <List  className="dayList" >

            <ListItemButton onClick={ handleClickMonday }>    
            <ListItemText primary="Poniedziałek" />
            {dayOpened==="mon" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
         
          <Collapse in={dayOpened==="mon"} timeout="auto" unmountOnExit>
           <List component="div" disablePadding>
              {teachersClasses[0].map((tclass,key) => { 
                return renderRow(tclass,key);
              })
              }
           </List>
          </Collapse>
            <ListItemButton onClick={ handleClickTuesday }>    
              <ListItemText primary="Wtorek" />
              {dayOpened==="tue" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
         
          <Collapse in={dayOpened==="tue"} timeout="auto" unmountOnExit>
           <List component="div" disablePadding>
              {teachersClasses[1].map((tclass, key) => { 
                return renderRow(tclass, key);
              })
              }
           </List>
          </Collapse>

            <ListItemButton onClick={ handleClickWend}>    
              <ListItemText primary="Środa" />
              {dayOpened==="wen" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

          <Collapse in={dayOpened==="wen"} timeout="auto" unmountOnExit>
           <List component="div" disablePadding>
              {teachersClasses[2].map((tclass, key) => { 
                return renderRow(tclass, key);
              })
              }
           </List>
          </Collapse>
          
            <ListItemButton onClick={ handleClickThursday }>    
              <ListItemText primary="Czwartek" />
              {dayOpened==="th" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
      
          <Collapse in={dayOpened==="th"} timeout="auto" unmountOnExit>
           <List component="div" disablePadding>
              {teachersClasses[3].map((tclass, key) => { 
                return renderRow(tclass, key);
              })
              }
           </List>
          </Collapse>
        
            <ListItemButton onClick={ handleClickFriday }>    
              <ListItemText primary="Piątek" />
              {dayOpened==="fr" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
   
          <Collapse in={dayOpened==="fr"} timeout="auto" unmountOnExit>
           <List component="div" disablePadding>
              {
                teachersClasses[4].map((tclass, key) => { 
                
                return renderRow(tclass, key);
              })
              }
           </List>
          </Collapse>
      </List>
      </Card>
    </div>
    <div className="classCard">
    <Card className="cardTable">
        {createTableTeacher()}
        <div className="buttonsDiv">
          <Button className="buttonSaveCancel" variant="contained" onClick={save }>Zapisz</Button>
          <Button className="buttonSaveCancel"  variant="outlined" onClick={ cancel}>Anuluj</Button>
        </div>
        {lineLoading ? <LinearProgress sx={{ marginTop: '5px' }} /> : <></>}
      </Card>
     
    </div>
    

    <Card className="legendCard">
      <ul className= "legendList" >
        <li>o - obecny</li>
        <li>n - nieobecny</li>
        <li>s - spóźniony</li>
        <li>u - usprawiedliwiony</li>
        <li>su - spóźniony usprawiedliwiony</li>
        <li>zw - zwolniony</li>
        <li>w - wycieczka</li>
      </ul>
    </Card>
  </Box>;
}
