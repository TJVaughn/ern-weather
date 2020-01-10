import React, { Component } from 'react';
import { toPercent } from './utils'
import PieChart from './Piechart/PieChart'
import LazyLoad from 'react-lazyload'

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
            wind: true,
            isAfterSunset: false,
            isBeforeSunrise: false,
            isDayTime: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleDayOrNight(){
        if(currTime < today.sunriseTime * 1000){
            return this.setState({ isBeforeSunrise: true, isAfterSunset: false, isDayTime: false })
        } else if(currTime > today.sunsetTime * 1000){
            return this.setState({ isBeforeSunrise: false, isAfterSunset: true, isDayTime: false })
        }
        return this.setState({isDayTime: true})
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
    dayTime(){
        return (today.sunsetTime * 1000) - (today.sunriseTime * 1000);
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

    componentDidMount(){
        this.handleDayOrNight()
    }
    componentWillUnmount(){
        
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
                            colors={['#12d1b855', "#fff0"]}
                        />
                    </div>
                    <LazyLoad height={100} offset={-100}>
                        <h3 className='align-center'>Wind</h3>
                        {/* <p className="align-center">MPH</p> */}
                        <div>
                            <p className="align-center" style={{color: "#888"}}>
                                click or tap
                            </p>
                        </div>
                        
                        
                        <div onClick={this.handleClick}>
                            {this.state.wind
                            ? <div className="Weather-today-pie-outer">
                                <div> 
                                    <PieChart 
                                        content={`Speed: \n${today.windSpeed.toFixed(0)} mph`}
                                        data={[(today.windBearing / 360 * 100) - 1, 1, 98 - (today.windBearing / 360 * 100)]}
                                        colors={['#fff0', '#12d1b866', '#fff0']}
                                        
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
                    </LazyLoad>
                    <LazyLoad height={100} offset={-100}>
                        <h3 className="align-center">Circadian</h3>
                        <div className="Weather-today-circadian sunrise-sunset">
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

                            {this.state.isDayTime
                            ? <PieChart 
                                data={[this.nightTime(), this.timeFromSunrise(), this.timeToSunset()]}
                                startAngle={0}
                                stroke={'#12d1b8'}
                                colors={['#0004', '#fff5', '#fff5']}
                                strokeWidth={2}
                            />
                            : ''
                            }
                            {this.state.isAfterSunset
                            ? <PieChart 
                                data={[this.timeFromSunset(), 
                                this.nightTime()- this.timeFromSunset(),
                                this.dayTime()
                            ]}
                                startAngle={0}
                                stroke={'#12d1b8'}
                                colors={['#0004', '#0004', '#fff5']}
                                strokeWidth={2}
                            />
                            : ''}
                            {this.state.isBeforeSunrise
                            ? <PieChart 
                            data={[ this.nightTime() - this.timeToSunrise(),
                                this.timeToSunrise(),
                                this.dayTime()
                        ]}
                            startAngle={0}
                            stroke={'#12d1b8'}
                            colors={['#0004', '#0004', '#fff5']}
                            strokeWidth={2}
                        />
                            : ''}
                        
                        
                        </div>
                    </LazyLoad>

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
