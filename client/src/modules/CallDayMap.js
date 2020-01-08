import React from 'react'
import { toPercent } from './utils'
import PieChart from './today/PieChart'

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
            
            <div>
                <h4>{`${handleDayOfWeek(item.time)}:`}</h4>
                <p className="align-center">
                    {item.summary}
                </p>
                <div className="This-week-map-inner">
                    <div>
                        {/* <p>Temp: F</p> */}
                        <p>
                            {Math.round(item.temperatureHigh)}&#176;
                            <br /><span className="sub-item-desc">High</span>
                        </p>
                        <p>
                            {Math.round(item.temperatureLow)}&#176;
                            <br /><span className="sub-item-desc">Low</span>
                        </p>
                    </div>
                    <div>
                
                        {/* <p>Sun:</p> */}
                
                        <p>
                            {new Date(item.sunriseTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                            <br /><span className="sub-item-desc">Sunrise</span>
                        </p>
                        <p>
                            {new Date(item.sunsetTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                            <br /><span className="sub-item-desc">Sunset</span>
                        </p>
                    </div>
                    <div>
                        {/* <p>Precip:</p> */}
                        <p>
                            {item.precipType
                            ? item.precipType
                            : 'none'}
                        </p>
                        <p>
                            {toPercent(item.precipProbability)}%
                            <br /><span className="sub-item-desc">chance</span>
                        </p>
                    </div>
                    <div>
                        <p>Wind: MPH</p>
                        <PieChart 
                            colors={['#fff0', '#fff', '#fff0']}
                            data={[(item.windBearing / 360 * 100) - 1, 1, 98 - (item.windBearing / 360 * 100)]}
                            content={item.windSpeed.toFixed(1)}
                            radius={25}
                            animate={false}
                            hole={10}
                        />
                        {/* <p>
                            {item.windSpeed.toFixed(1)}
                            <br /><span className="sub-item-desc">Speed</span>
                        </p> */}
                        <p>
                            {item.windGust.toFixed(1)}
                            <br /><span className="sub-item-desc">Gust</span>
                        </p>
                        {/* <p>
                            {item.windBearing}&#176;
                            <br /><span className="sub-item-desc">Direction</span>
                        </p> */}
                    </div>
                    <div>
                        <p>Other:</p>
                        <p></p>
                        <p>
                            {toPercent(item.cloudCover)}%
                            <br /><span className="sub-item-desc">Cloud Cover</span>
                        </p>
                        <p>
                            {item.pressure}
                            <br /><span className="sub-item-desc">Pressure</span>
                        </p>
                        <p>
                            {toPercent(item.humidity)}%
                            <br /><span className="sub-item-desc">Humidity</span>
                        </p>
                        {/* <p>
                            {item.dewPoint.toFixed(1)}&#176;F
                            <br /><span className="sub-item-desc">Dew Point</span>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export {callDayMap, thisWeekMap};