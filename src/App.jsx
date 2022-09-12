import { useState } from "react";
import DateTime from "./components/form/DateTime";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  return (
    <div className="App">
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <h1> Weather Forecast & Traffic Cam </h1>
      {/* {data.items[0].cameras[0].timestamp}
      {data.items[0].cameras[0].location.longitude} */}
        
        <DateTime error={error} loading={loading}/>
     
        </div>
        
      )}
    </div>
  );
}

export default App;
