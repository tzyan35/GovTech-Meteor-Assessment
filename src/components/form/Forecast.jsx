import React, { useEffect, useState } from 'react'

const Forecast = ({forecastInfo, location}) => {
    const [forecast, setForecast] = useState()

    function checkForecast() {
        forecastInfo.map((f)=>{
            if(f.area === location.name){
                setForecast(f.forecast)
            } 
        })
    }
    


    useEffect(()=> {
        checkForecast()
    },[location])
    
//     console.log(forecastInfo[0])



  return (
    <div>
        <h4>Forecast: {forecast}</h4> 
        
    </div>
  )
}

export default Forecast