import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useEffect } from "react";
import Location from "./Location";



export default function BasicDateTimePicker({loading}) {
  const [value, setValue] = React.useState(dayjs());
  const [startTime, setStartTime] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [error,setError] = useState('')

    // console.log(value.$d.toISOString().replace(".000Z",""))
    function toLocalTime() {
      try {
      setStartTime(new Date(value.$d).toISOString().replace(".000Z","") );

      setLocalTime(startTime.split(':')[0] + "%3A" + startTime.split(':')[1] + "%3A" + startTime.split(':')[2])
      } catch (err){
        setError(err)
     
      }
    }

    console.log(error)
    useEffect(()=>{
     
      toLocalTime()
    },[value])

  return (
    <div>
      {error == "" ? <div>{error}</div> : ""} 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <DateTimePicker 
    
        renderInput={(props) => <TextField {...props} />}
        label="Date and Time Picker"
        value={value}
        inputFormat="YYYY/MM/DD hh:mm:ss a"
        onChange={(newValue) => {
          setValue(newValue);
          
        }}

        minDateTime={dayjs("2016-03-01T00:00")}
        maxDateTime={dayjs()}
        hideTabs
       

      />
      <Location time={localTime} loading={loading}/>
        {/* {value} */}
    </LocalizationProvider>

    </div>
  );
}
