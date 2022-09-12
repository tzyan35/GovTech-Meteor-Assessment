import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useEffect } from "react";
import Location from "./Location";
 // eslint-disable-next-line no-empty-pattern
export default function BasicDateTimePicker({}) {
  const [value, setValue] = useState(dayjs());
  const [localTime, setLocalTime] = useState("");

  function toLocalTime() {
    try {
      const offset = new Date(value.$d).getTimezoneOffset() * 60000;
      const time = new Date(value.$d - offset)
        .toISOString()
        .replace(".000Z", "");
      setLocalTime(
        time.split(":")[0] +
          "%3A" +
          time.split(":")[1] +
          "%3A" +
          time.split(":")[2]
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    toLocalTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
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
        {value > dayjs() || value.$d < dayjs("2016-03-01T00:00") ? (
          <h4>Please input a valid date</h4>
        ) : (
          <Location time={localTime} />
        )}
      </LocalizationProvider>
    </div>
  );
}
