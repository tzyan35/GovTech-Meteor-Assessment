import { useState } from "react";
import DateTime from "./components/DateTime";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  

  return (
    <div className="App">
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <h1> Weather Forecast & Traffic Cam </h1>
 
        
        <DateTime/>
     
        </div>
        
      )}
    </div>
  );
}

export default App;
