import React from 'react'
import { toPercent } from './utils'

let thisWeekMap = []
   
const getDayOfWeek = (time) =>{
    const value = new Date(time * 1000);
    const dayNum = value.getDay();
    if(dayNum === 0){
        return "Sunday"
    } else if(dayNum === 1) {
        return "Monday"
    } else if(dayNum === 2) {
        return "Tuesday"
    } else if(dayNum === 3) {
        return "Wednesday"
    } else if(dayNum === 4) {
        return "Thursday"
    } else if(dayNum === 5) {
        return "Friday"
    } else {
        return "Saturday"
    }
}
const handleDayOfWeek = (time) => {
    return getDayOfWeek(time)
}
const callDayMap = (array) => {
    // console.log(array)
    return thisWeekMap = array.map(item => 
        <div key={`${item.time}-key`}>
            <h4>{`${handleDayOfWeek(item.time)}:`}</h4>
            <p className="align-center">
                {item.summary}
            </p>
            <div className="Weather-today-outer">
            <div>
                <h5>Temperature: F</h5>
                <p>
                    High: {Math.round(item.temperatureHigh)}&#176;
                </p>
                <p>
                    Low: {Math.round(item.temperatureLow)}&#176;
                </p>
            </div>
            <div>
                
                <h5>Sun:</h5>
        
                <p>
                    Sunrise: {new Date(item.sunriseTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                </p>
                <p>
                    Sunset: {new Date(item.sunsetTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                </p>
            </div>
            
            
            <div>
                <h5>Precipitation:</h5>
                <p>
                    Type: {item.precipType
                    ? item.precipType
                    : 'none'}
                </p>
                <p>
                    Chance: {toPercent(item.precipProbability)}%
                </p>
            </div>
            
            <div>
                <h5>Wind: MPH</h5>
                <p>
                    Speed: {item.windSpeed.toFixed(1)}
                </p>
                <p>
                    Gust: {item.windGust.toFixed(1)}
                </p>
                <p>
                    Direction: {item.windBearing}&#176;
                </p>
            </div>
            <div>
                <h5>Other:</h5>
                <p></p>
                <p>
                    Cloud Cover: {toPercent(item.cloudCover)}%
                </p>
                <p>
                    Pressure: {item.pressure}
                </p>
            </div>
            <div>
                <p>
                    Humidity: {toPercent(item.humidity)}%
                </p>
                <p>
                    Dew Point: {item.dewPoint.toFixed(1)}&#176;F
                </p>
            </div>
                
            </div>
        </div>
    )
}

export {callDayMap, thisWeekMap};