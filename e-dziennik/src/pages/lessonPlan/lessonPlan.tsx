import { Box } from "@mui/system";
import * as React from 'react';
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import "./lessonPlan.css"
export default function LessonPlan() {
  const [columns, setColumns] = React.useState([
    {
      field: "day", headerName: "Dzień", flex: 0.11, editable: false, sortable: false, filterable: false },
    { field: "0", headerName: "Lekcja 0",  flex: 0.11, editable: false, sortable: false, filterable: false },
    { field: "1", headerName: "Lekcja 1",  flex: 0.11, editable: false,sortable:false, filterable:false  },
    { field: "2", headerName: "Lekcja 2",  flex: 0.11, editable: false,sortable:false, filterable:false  },
    { field: "3", headerName: "Lekcja 3",  flex: 0.11, editable: false,sortable:false, filterable:false  },
    { field: "4", headerName: "Lekcja 4",  flex: 0.11, editable: false,sortable:false, filterable:false  },
    { field: "5", headerName: "Lekcja 5",  flex: 0.11, editable: false,sortable:false, filterable:false  },
    { field: "6", headerName: "Lekcja 6",  flex: 0.11, editable: false,sortable:false, filterable:false  },
    { field: "7", headerName: "Lekcja 7", flex: 0.11, editable: false, sortable:false, filterable:false  }]);
  const [rows, setRows] = React.useState([
    { id: 1, day: "Poniedziałek", 0: "", 1: "Język polski s. 11", 2: "Matematyka s. 12", 3: "Historia s.13", 4: "W-F Sala główna", 5: "", 6: "", 7: "" },
    { id: 2, day: "Wtorek", 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
    { id: 3, day: "Środa", 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
    { id: 4, day: "Czwartek", 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
    { id: 5, day: "Piątek", 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" }]);
  
  
    function createLessonPlan()
    {
     return <div className="Freq">
       <DataGrid rows={rows} columns={columns} rowsPerPageOptions={[]} rowHeight={ 130} getCellClassName={(params) => {
         return "cell"
       }}
         disableColumnMenu={true}
         disableDensitySelector={false} />
       
    </div>
    }
  console.log(columns)
  return <Box style={{ height:"100vh", width: '100%' }}>
    {createLessonPlan()}
  </Box>;
}
