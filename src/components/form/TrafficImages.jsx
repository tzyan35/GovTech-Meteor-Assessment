import { useEffect, useState } from "react";
import axios from "axios";

const TrafficImages = ({ time, location }) => {
  const [trafficData, setTrafficData] = useState();
  const [trafficImage, setTrafficImage] = useState();


  const checker = async () => {
    try {
      await trafficData?.items[0]?.cameras.map((c) => {
        if (
          Math.abs(
            location.label_location.latitude.toFixed(3) -
              c.location.latitude.toFixed(3)
          ) <= 0.05 &&
          Math.abs(
            location.label_location.longitude.toFixed(3) -
              c.location.longitude.toFixed(3)
          ) <= 0.05
        ) {
          setTrafficImage(c.image);
        } else {
          console.log("error");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  

  const trafficUrl = `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${time}`;

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        let { data: response } = await axios.get(trafficUrl);
        setTrafficData(response);
      } catch (err) {
        console.log(err);
      }
    };

   fetchTrafficData();
   checker()
    
  }, [time,location]);
  console.log(trafficImage)
  return (
    <div>
      {trafficImage ? (
        <img src={trafficImage} alt="" width="600" height="600" />
      ) : (
        <h4>No Image Found... </h4>
      )}
    </div>
  );
};

export default TrafficImages;
