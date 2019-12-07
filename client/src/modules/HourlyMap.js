import React from 'react'
import clearImg from '../images/clear.png';
import partlyCloudyImg from '../images/partly-cloudy.png'
import mostlyCloudyImg from '../images/mostly-cloudy.png'
import overcastImg from '../images/overcast.png';
// import lightSnowImg from '../images/light-snow.png'
import snowImg from '../images/snow.png'
import windyImg from '../images/windy.png'
import veryWindyImg from '../images/very-windy.png'
import { toPercent } from './utils'

let hourlyMap = []

const HourlyTableHead = () => {
return (<div className="Weather-hourly-table-head">
<h5>Time:</h5>
<p>

</p>
<p>
    Summary:
</p>
<p>
    Temp(deg):
</p>
<p>
    Precip:
</p>
<p>
    % Chance: 
</p>
<p>
    Wind(mph):
</p>
<p>
    Gust(mph):
</p>
<p>
    Direction(deg):
</p>
<p>
    Humidity:
</p>
</div>)}

const handleHourlyIcon = (summary, wind, precipType, precipProb) => {
    let icon = summary.toLowerCase();
    // let iconSplitArr = icon.split('')
    // console.log(iconSplitArr)
    let isWindy = false;
    let isVeryWindy = false;
    if(wind >= 12) {
        isWindy = true;
    }
    if(wind >= 20) {
        isVeryWindy = true;
    }
    let imgSrc = ''
    if(isWindy && !isVeryWindy) {
        imgSrc = windyImg
    } else if(isWindy && isVeryWindy) {
        imgSrc = veryWindyImg
    } else if(icon === 'clear'){
        imgSrc = clearImg
    } else if(icon === 'partly cloudy') {
        imgSrc = partlyCloudyImg
    } else if(icon === 'mostly cloudy'){
        imgSrc = mostlyCloudyImg
    } else if(precipType === "snow" && precipProb >= 0.20) {
        imgSrc = snowImg
    } else {
        imgSrc = overcastImg
    }
    return imgSrc;
}

const handleHourlyMap = (array) => {
    hourlyMap = array.map(item =>
        <div className="Hourly-map" key={`key-time-${item.time}`}>
            <h5>
                {new Date(item.time * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
            </h5>
            
                <p className="hourly-item-summary">
                    {item.summary}
                </p>
                <img className="Hourly-summary-icon" src={handleHourlyIcon(item.summary, item.windSpeed, item.precipType, item.precipProbability)} alt={item.summary} />
                <p>
                    {Math.round(item.temperature)}F
                </p>
                <p>
                    {item.precipType
                    ? item.precipType
                    : 'none'}
                </p>
                <p>
                    {toPercent(item.precipProbability)}%
                </p>
                <p>
                    {Math.round(item.windSpeed)}
                </p>
                <p>
                    {Math.round(item.windGust)}
                </p>
                <p>
                    {Math.round(item.windBearing)}
                </p>
                <p>
                    {toPercent(item.humidity)}%
                </p>
        </div>
        )
}

export { handleHourlyMap, HourlyTableHead, hourlyMap };