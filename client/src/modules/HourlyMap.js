import React from 'react'
import clearImg from '../images/clear.png';
import partlyCloudyImg from '../images/partly-cloudy.png'
import mostlyCloudyImg from '../images/mostly-cloudy.png'
import overcastImg from '../images/overcast.png';
import lightSnowImg from '../images/light-snow.png'
import snowImg from '../images/snow.png'
import { toPercent } from './utils'

let hourlyMap = []

const handleHourlyIcon = (summary) => {
    let icon = summary.toLowerCase();
    let imgSrc = ''
    if(icon === 'clear'){
        imgSrc = clearImg
    } else if(icon === 'partly cloudy') {
        imgSrc = partlyCloudyImg
    } else if(icon === 'mostly cloudy'){
        imgSrc = mostlyCloudyImg
    } else if(icon === 'light snow') {
        imgSrc = lightSnowImg
    } else if(icon === 'snow') {
        imgSrc = lightSnowImg
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
                <img className="Hourly-summary-icon" src={handleHourlyIcon(item.summary)} alt={item.summary} />
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

export { handleHourlyMap, hourlyMap };