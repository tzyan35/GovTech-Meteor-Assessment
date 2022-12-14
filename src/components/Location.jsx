import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import TrafficImages from "./TrafficImages";
import Forecast from "./Forecast";

export default function SelectLabels({ time, value }) {
  const [location, setLocation] = React.useState("");
  const [weatherData, setWeatherData] = useState({});
  const [forecastInfo, setForecastInfo] = useState();

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const weatherUrl = `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${time}`;

  function forecast() {
    try {
      setForecastInfo(weatherData.items[0]?.forecasts);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      let { data: response } = await axios.get(weatherUrl);
      setWeatherData(response);
    };

    fetchWeatherData();
    forecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <div>
      {weatherData.api_info ? (
        <FormControl sx={{ m: 2, minWidth: 260 }}>
          <InputLabel id="Location">Location</InputLabel>
          <Select
            labelId="Location"
            id="Location"
            value={location}
            label="Location"
            onChange={handleChange}
            placeholder={location.name}
            autoWidth="false"
            MenuProps={{
              PaperProps: { sx: { maxHeight: 200 } },
            }}
          >
            {weatherData &&
              weatherData.area_metadata?.map((loc, index) => {
                return (
                  <MenuItem key={index} value={loc}>
                    {loc.name}
                  </MenuItem>
                );
              })}
          </Select>

          {!location && <h3>Select a Location</h3>}
        </FormControl>
      ) : (
        <h3>Select a Date and Time</h3>
      )}
      {location && (
        <Forecast
          location={location}
          forecastInfo={forecastInfo}
          value={value}
        />
      )}
      {location && (
        <TrafficImages location={location} time={time} value={value} />
      )}
    </div>
  );
}
