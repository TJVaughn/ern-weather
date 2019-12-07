import React, { Component } from 'react';
import { toPercent } from './utils'

let today = ''
let curr = ''
const handleToday = (currArr, todayArr) => {
    today = todayArr;
    curr = currArr;
}

class TodayComp extends Component {
    render(){
    	return(
    		<div>
                <h3 className="align-center">{today.summary}</h3>
                <p>
                    
                </p>
                <div className="Weather-today-outer">
                    
                    <div>
                        {/* <h5>Temp: F</h5> */}
                        <p>
                            {Math.round(curr.temperature)}&#176;
                            <br /><span className="sub-item-desc">Current</span>
                        </p>
                        <p>
                            {Math.round(curr.apparentTemperature)}&#176;
                            <br /><span className="sub-item-desc">Feels like</span>
                        </p>
                        
                    </div>
                    <div>
                        <p>
                            {Math.round(today.temperatureHigh)}&#176;
                            <br /><span className="sub-item-desc">High</span>
                        </p>
                        <p>
                            {Math.round(today.temperatureLow)}&#176;
                            <br /><span className="sub-item-desc">Low</span>
                        </p>
                    </div>
                    
                    <div>
                        {/* <h5>Precip:</h5> */}
                        <p>
                            {today.precipType
                            ? today.precipType
                            : 'none'}
                        </p>
                        <p>
                            {toPercent(today.precipProbability)}%
                            <br /><span className="sub-item-desc">Chance</span>
                        </p>
                    </div>
                    <div>
                        {/* <h5>Sun:</h5> */}
                        <p>
                            {new Date(today.sunriseTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                            <br /><span className="sub-item-desc">Sunrise</span>
                        </p>
                        <p>
                            {new Date(today.sunsetTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                            <br /><span className="sub-item-desc">Sunset</span>
                        </p>
                    </div>
                    <div>
                        <h5>Wind: MPH</h5>
                        <p>
                            {today.windSpeed.toFixed(1)}
                            <br /><span className="sub-item-desc">Speed</span>
                        </p>
                        <p>
                            {today.windGust.toFixed(1)}
                            <br /><span className="sub-item-desc">Gust</span>
                        </p>
                        <p>
                            {today.windBearing}&#176;
                            <br /><span className="sub-item-desc">Direction</span>
                        </p>
                    </div>
                    {/* <div> */}
                        {/* <h5>Other:</h5> */}
                        <p>
                            {toPercent(today.cloudCover)}%
                            <br /><span className="sub-item-desc">Cloud Cover</span>
                        </p>
                        <p>
                            {today.pressure}
                            <br /><span className="sub-item-desc">Pressure</span>
                        </p>

                        <p>
                            {toPercent(today.humidity)}%
                            <br /><span className="sub-item-desc">Humidity</span>
                        </p>
                        <p>
                            {today.dewPoint.toFixed(1)}&#176;F
                            <br /><span className="sub-item-desc">Dew Point</span>
                        </p>
                    {/* </div> */}
                        
                </div>
            </div> 
    	);
    }
}
export {TodayComp, handleToday} ;
