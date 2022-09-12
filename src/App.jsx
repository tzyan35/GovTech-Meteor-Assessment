import { useEffect, useState } from "react";
import DateTime from "./components/DateTime";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    setLoading(true)
  },[])
  
  return (
    <div className="App">
      {!loading ? <div>Loading...</div>: null}
      {loading && (
        <div>
          <h1> Weather Forecast & Traffic Cam </h1>
 
        
        <DateTime/>
     
        </div>
        
      )}
    </div>
  );
}

export default App;
