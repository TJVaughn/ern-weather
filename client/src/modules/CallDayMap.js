import React from 'react'
import { toPercent } from './utils'
// import PieChart from './Piechart/PieChart'

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
        <div className="This-week-map" key={`${item.time}-key`}>
            <div className="This-week-map-inner">
                <h4>{`${handleDayOfWeek(item.time)}:`}</h4>

                <p className="align-center">
                    {item.summary}
                </p>
                <p></p>
                <p>
                    {Math.round(item.temperatureHigh)}&#176;
                </p>
                <p>
                    {Math.round(item.temperatureLow)}&#176;
                </p>
                <p>
                    {new Date(item.sunriseTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                </p>
                <p>
                    {new Date(item.sunsetTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                </p>
                <p>
                    {item.precipType
                    ? item.precipType
                    : 'none'}
                </p>
                <p>
                    {toPercent(item.precipProbability)}%
                </p>
                {/* <PieChart 
                    colors={['#fff0', '#fff', '#fff0']}
                    data={[(item.windBearing / 360 * 100) - 3, 3, 94 - (item.windBearing / 360 * 100)]}
                    content={item.windSpeed.toFixed(1)}
                    radius={20}
                    animate={false}
                    hole={10}
                /> */}
                <p>
                    {item.windSpeed.toFixed(1)}
                </p>
                <p>
                    {item.windGust.toFixed(1)}
                </p>
                <p>
                    {toPercent(item.cloudCover)}%
                </p>
                <p>
                    {item.pressure}
                </p>
                <p>
                    {toPercent(item.humidity)}%
                </p>
            </div>
        </div>
    )
}

export {callDayMap, thisWeekMap};