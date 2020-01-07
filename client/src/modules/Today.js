import React, { Component } from 'react';
import { toPercent } from './utils'
import PieChart from './today/PieChart'

// currDay = 
const currTime = new Date()
let today = ''
let curr = ''
const handleToday = (currArr, todayArr) => {
    today = todayArr;
    curr = currArr;
}


class TodayComp extends Component {
    constructor(props){
        super(props);
        this.state = {
            wind: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        if(this.state.wind){
            return this.setState({wind: false})
        }
        this.setState({wind: true})
    }

    // handleCircadian(){
    //     if(currTime < today.sunsetTime){
    //         this.timeToSunset()
    //     }
    //     if(currTime > today.sunriseTime){
    //         this.timeFromSunrise()
    //     }
    //     if(currTime > today.sunsetTime || currTime < today.sunriseTime){
    //         this.nightTime()
    //     }
    // }

    timeToSunset(){
        if(currTime > today.sunsetTime * 1000){
            return 0;
        }
        return today.sunsetTime * 1000 - currTime;
    }
    timeFromSunrise(){
        if(currTime < today.sunriseTime * 1000){
            return 0;
        }
        return currTime - today.sunriseTime * 1000;
    }
    nightTime(){
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let date = new Date().getDate()
        let midnightTonight = new Date(year, month, date, 23, 59, 59).valueOf()
        let midnightLastNight = new Date(year, month, date, 0, 0, 0).valueOf()

        let timeToMidnightAfterSet = midnightTonight - today.sunsetTime * 1000;
        console.log(timeToMidnightAfterSet)
        let timeFromMidnightBeforeRise = today.sunriseTime * 1000 - midnightLastNight;
        console.log(timeFromMidnightBeforeRise)

        return timeToMidnightAfterSet + timeFromMidnightBeforeRise;
    }

    render(){
    	return(
    		<div>
                <h3 className="align-center">{today.summary}</h3>
                <div>
                    <div className="Weather-today-outer fade-in">
                        {/* <h5>Temp: F</h5> */}
                        <p>
                            {Math.round(curr.temperature)}&#176;
                            <br /><span className="sub-item-desc">Current</span>
                        </p>
                        <p>
                            {Math.round(today.temperatureHigh)}&#176;
                            <br /><span className="sub-item-desc">High</span>
                        </p>
                        <p>
                            {Math.round(curr.apparentTemperature)}&#176;
                            <br /><span className="sub-item-desc">Feels like</span>
                        </p>
                        <p>
                            {Math.round(today.temperatureLow)}&#176;
                            <br /><span className="sub-item-desc">Low</span>
                        </p>
                    </div>
                    <h3 className="align-center">Chance of {today.precipType
                        ? today.precipType
                        : 'precipitation'}
                    </h3>
                    <div className="Weather-today-pie-outer fade-in">
                        <PieChart 
                            content={toPercent(today.precipProbability) + '%'}
                            data={[toPercent(today.precipProbability), 100 - toPercent(today.precipProbability)]}
                            colors={['#12d1b8', "#fff0"]}
                        />
                    </div>
                        
                    <h3 className='align-center'>Wind</h3>
                    {/* <p className="align-center">MPH</p> */}
                    <p className="align-center">
                        click or tap
                    </p>
                    
                    <div onClick={this.handleClick}>
                        {this.state.wind
                        ? <div className="Weather-today-pie-outer">
                            <div> 
                                <PieChart 
                                    content={`Speed: \n${today.windSpeed.toFixed(0)} mph`}
                                    data={[(today.windBearing / 360 * 100) - 1, 1, 98 - (today.windBearing / 360 * 100)]}
                                    colors={['#fff0', '#12d1b8', '#fff0']}
                                />
                            </div>
                        </div>
                        : <div className="Weather-today-pie-outer">    
                            <div> 
                                <PieChart 
                                    content={"Gust: \n" + today.windGust.toFixed(0) + 'mph'}
                                    data={[(today.windBearing / 360 * 100) - 1, 1, 98 - (today.windBearing / 360 * 100)]}
                                    colors={['#fff0', '#12d1b8', '#fff0']}
                                />
                            </div>
                        </div>}
                    </div>

                    <h3 className="align-center">Circadian</h3>
                        
                    <div className="Weather-today-circadian">
                    <PieChart 
                            content={
                            `${new Date(today.sunriseTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})} \n
                            ${new Date(today.sunsetTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}`
                        }
                        // First part is sunset, followed by blank 50, followed by sunrise
                            data={[this.timeToSunset(), this.nightTime(), this.timeFromSunrise()]}
                            colors={['rgb(38, 166, 240)', '#000', '#a4b']}
                        />
                       
                    </div>
                    <div className="Weather-today-circadian">
                    <p>
                            {new Date(today.sunriseTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                            <br /><span className="sub-item-desc">Sunrise</span>
                        </p>
                        <p>
                            {new Date(today.sunsetTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                            <br /><span className="sub-item-desc">Sunset</span>
                        </p>
                    </div>

                    <h3 className="align-center">Other:</h3>
                    <div className="Weather-today-other">
                        
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
                    </div>
                        
                </div>
            </div> 
    	);
    }
}
export {TodayComp, handleToday} ;
