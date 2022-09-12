import { useEffect, useState } from "react";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const TrafficImages = ({ time, location }) => {
  const [trafficData, setTrafficData] = useState();
  const [trafficImage, setTrafficImage] = useState();

  const checker = () => {
    try {
      trafficData?.items[0]?.cameras.map((c) => {
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
          return null
        } else {
          console.log("error");
          return null
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, location]);

  useEffect(() => {
    checker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trafficData]);

  return (
    <div>
      {trafficImage ? (
        <Zoom>
          <img
            alt=""
            src={trafficImage}
            width="600"
            height="600"
          />
        </Zoom>
      ) : (
        <h4>No Image Found... Please select another location. </h4>
      )}
    </div>
  );
};

export default TrafficImages;
