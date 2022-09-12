import React, { useEffect, useState } from "react";

const Forecast = ({ forecastInfo, location }) => {
  const [forecast, setForecast] = useState();

  function checkForecast() {
     // eslint-disable-next-line array-callback-return
    forecastInfo.map((f) => {
      if (f.area === location.name) {
        setForecast(f.forecast);
        return f.forecast
      }
    });
  }

  useEffect(() => {
    checkForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, forecastInfo]);

  return (
    <div>
      <h4>Forecast: {forecast}</h4>
    </div>
  );
};

export default Forecast;
