import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "../index";

const Forecast = ({ forecastInfo, location, value }) => {
  const [forecast, setForecast] = useState();

  function checkForecast() {
    // eslint-disable-next-line array-callback-return
    forecastInfo.map((f) => {
      if (f.area === location.name) {
        setForecast(f.forecast);
        return f.forecast;
      }
    });
  }

  useEffect(() => {
    checkForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, forecastInfo]);

  return (
    <div>
      {!forecast || value.$d > dayjs().$d ? (
        <h4 className="forecast">2 Hour Forecast: {forecast}</h4>
      ) : (
        <h4>Past Forecast: {forecast}</h4>
      )}
    </div>
  );
};

export default Forecast;
