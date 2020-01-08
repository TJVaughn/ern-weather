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

    timeToSunset(){
        if(currTime > today.sunsetTime * 1000){
            return 0;
        }
        return today.sunsetTime * 1000 - currTime;
    }
    timeFromSunrise(){
        if(currTime < today.sunriseTime * 1000){
            return 1;
        }
        return currTime - today.sunriseTime * 1000;
    }
    timeFromSunset(){
        if(currTime < today.sunsetTime * 1000){
            return 0;
        }
        return currTime - today.sunsetTime * 1000;
    }

    timeToSunrise(){
        if(currTime > today.sunriseTime * 1000){
            return 0;
        }
        return today.sunriseTime * 1000 - currTime;
    }

    nightTime(){
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let date = new Date().getDate()
        let midnightTonight = new Date(year, month, date, 23, 59, 59).valueOf()
        let midnightLastNight = new Date(year, month, date, 0, 0, 0).valueOf()

        let timeToMidnightAfterSet = midnightTonight - today.sunsetTime * 1000;

        let timeFromMidnightBeforeRise = today.sunriseTime * 1000 - midnightLastNight;

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
                        <p>
                            {new Date(today.sunriseTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                            <br /><span className="sub-item-desc">Sunrise</span>
                        </p>
                        <p>
                            {new Date(today.sunsetTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                            <br /><span className="sub-item-desc">Sunset</span>
                        </p>
                    </div>
                    <div className="Weather-today-circadian">
                    <PieChart 
                            
                        // First part is sunset, followed by blank 50, followed by sunrise
                            data={[
                                currTime > today.sunsetTime * 1000
                                ? this.timeFromSunset()
                                : 0,

                                currTime > today.sunsetTime * 1000
                                ? this.nightTime() - this.timeFromSunset()
                                : 0,

                                currTime < today.sunriseTime * 1000
                                ? this.nightTime() - this.timeToSunrise()
                                : 0,

                                currTime < today.sunriseTime * 1000
                                ? this.timeToSunrise()
                                : 0,

                                this.timeFromSunrise(),
                                this.timeToSunset()
                            ]}
                            colors={['#000', '#000', 'rgb(38, 166, 240)', 'rgb(38, 166, 240)', 'rgb(38, 166, 240)', 'rgb(38, 166, 240)']}
                            startAngle={0}
                            stroke={'#12d1b8'}
                        />
                       
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
