import React, { Component } from 'react';
import { toPercent, callWeatherAPI } from './utils';
import clearImg from '../images/clear.png';
import partlyCloudyImg from '../images/partly-cloudy.png'
import mostlyCloudyImg from '../images/mostly-cloudy.png'
import overcastImg from '../images/overcast.png';


let weatherArray = []
let curr = []
let dayArray = []
let alerts = []
let alertsMap = []
let thisWeekMap = []
let hourlyArray = []
let hourlyMap = []
let today = []

class Weather extends Component {
    constructor(props){
        super(props);
        this.state = {
            input: '',
            error: '',
            errorSwitch: false,
            alertSwitch: false,
            switch: false,
            loading: '',
            alertContentSwitch: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAlertContent = this.handleAlertContent.bind(this);
        this.handleDayOfWeek = this.handleDayOfWeek.bind(this)
    }

    callAlertsMap(alerts){
        return alertsMap = alerts.map(item =>
            // Must give the items unique keys!
            <div key={`alerts-${item.title}-${item.description}`}>
                <h5>{item.title}</h5>
                <p>
                    {item.description}
                </p>
            </div>
        )
    }
    getDayOfWeek(time){
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
    handleDayOfWeek(time){
        return this.getDayOfWeek(time)
    }
    callDayMap(array){
        // console.log(array)
        return thisWeekMap = array.map(item => 
            <div key={`${item.time}-key`}>
                <h4>{`${this.handleDayOfWeek(item.time)}:`}</h4>
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

    handleHourlyIcon(summary){
        let icon = summary.toLowerCase();
        let imgSrc = ''
        if(icon === 'clear'){
            imgSrc = clearImg
        } else if(icon === 'partly cloudy') {
            imgSrc = partlyCloudyImg
        } else if(icon === 'mostly cloudy'){
            imgSrc = mostlyCloudyImg
        } else {
            imgSrc = overcastImg
        }
        return imgSrc;
    }

    handleHourlyMap(array){
        hourlyMap = array.map(item =>
            <div className="Hourly-map" key={`key-time-${item.time}`}>
                <h5>
                    {new Date(item.time * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                </h5>
                
                    <p className="hourly-item-summary">
                        {item.summary}
                    </p>
                    <img className="Hourly-summary-icon" src={this.handleHourlyIcon(item.summary)} alt={item.summary} />
                    <p>
                        {Math.round(item.temperature)}F
                    </p>
                    <p>
                        {toPercent(item.humidity)}%
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
            </div>
            )
    }

    handleChange(evt){
        this.setState({input: evt.target.value})
    }

    handleSubmit(evt){
        evt.preventDefault();
        this.setState({switch: false})
        this.setState({alertSwitch: false})
        this.setState({loading: '...getting forecast'})
        callWeatherAPI(this.state.input).then((res) => {
            // Set error to true ...
            this.setState({errorSwitch: true})
            weatherArray = res;
            curr = weatherArray.forecast.currently;
            dayArray = weatherArray.forecast.daily.data;
            hourlyArray = weatherArray.forecast.hourly.data;
            // console.log(hourlyArray)
            this.handleHourlyMap(hourlyArray)
            today = dayArray.shift()
            console.log(today)
            this.callDayMap(dayArray);
            if(weatherArray.forecast.alerts) {
                alerts = weatherArray.forecast.alerts;
                if(alerts.length > 0) {
                    this.setState({alertSwitch: true})
                    this.callAlertsMap(alerts)
                }
            }

            // Assuming all of these items are defined, the program will keep running
            //Otherwise it will stop and error switch will remain true
            // We call this function to now iterate over the array as it will not be empty anymore
            // console.log(weatherArray)
            // console.log(res.error)
            this.setState({error: res.error})
            // We will remove the loading message
            this.setState({loading: ''})
            // We set switch to true which will now render all the data
            this.setState({switch: true})
            //Because everything has worked at this point, we will reset error switch to false
            this.setState({errorSwitch: false})
        }).catch(err => console.log(err))
    }

    handleAlertContent(){
        if(!this.state.alertContentSwitch){
            this.setState({alertContentSwitch: true})
        } else {
            this.setState({alertContentSwitch: false})
        }
    }
    componentDidMount(){
        this.setState({switch: false})
        this.setState({alertSwitch: false})
        this.setState({loading: '...getting forecast'})
        callWeatherAPI('Casa Grande, AZ').then((res) => {
            // Set error to true ...
            this.setState({errorSwitch: true})
            weatherArray = res;
            curr = weatherArray.forecast.currently;
            dayArray = weatherArray.forecast.daily.data;
            hourlyArray = weatherArray.forecast.hourly.data;
            // console.log(hourlyArray)
            this.handleHourlyMap(hourlyArray)
            today = dayArray.shift()
            console.log(today)
            this.callDayMap(dayArray);
            if(weatherArray.forecast.alerts) {
                alerts = weatherArray.forecast.alerts;
                if(alerts.length > 0) {
                    this.setState({alertSwitch: true})
                    this.callAlertsMap(alerts)
                }
            }

            // Assuming all of these items are defined, the program will keep running
            //Otherwise it will stop and error switch will remain true
            // We call this function to now iterate over the array as it will not be empty anymore
            // console.log(weatherArray)
            // console.log(res.error)
            this.setState({error: res.error})
            // We will remove the loading message
            this.setState({loading: ''})
            // We set switch to true which will now render all the data
            this.setState({switch: true})
            //Because everything has worked at this point, we will reset error switch to false
            this.setState({errorSwitch: false})
        }).catch(err => console.log(err))
    }

    render(){
    	return(
    		<div>

                {/* FORM TO HANDLE SEARCH INPUT */}
    			<form onSubmit={this.handleSubmit}>
                    <label>Location: </label>
                    <input value={this.state.input} onChange={this.handleChange} />
                    <button>Get</button>
                </form>

                <div>
                    {/* IF ERROR SWITCH IS TRUE, THE FORMER TEXT IS DISPLAYED */}
                    {this.state.errorSwitch 
                    ? <h4>"Sorry, check your connection or provide a valid search term"</h4>
                    :''}


                    <div>
                        {/* RENDERS ALL THE CONTENT IF ITS BEEN FETCHED, OR loading state */}
                        {this.state.switch
                        ? <div>

                            <h2>
                                {weatherArray.name}
                            </h2>

                            {this.state.alertSwitch
                            ?<div>
                                <div className="Alert-button" onClick={this.handleAlertContent}>
                                    Alerts!
                                </div>
 
                                {this.state.alertContentSwitch
                                ? <div>
                                    <h4>Alerts:</h4>
                                    {alertsMap}
                                </div>
                                :''}
                            </div>
                            :''}
                            
                            <h3 className="align-center">{today.summary}</h3>
                            <p>
                                
                            </p>
                            <div className="Weather-today-outer">
                                
                                <div>
                                    <h5>Temperature: F</h5>
                                    <p>
                                        Current: {Math.round(curr.temperature)}&#176;
                                    </p>
                                    <p>
                                        Feels Like: {Math.round(curr.apparentTemperature)}&#176;
                                    </p>
                                    <p>
                                        High: {Math.round(today.temperatureHigh)}&#176;
                                    </p>
                                    <p>
                                        Low: {Math.round(today.temperatureLow)}&#176;
                                    </p>
                                </div>
                                
                                <div>
                                    <h5>Precipitation:</h5>
                                    <p>
                                        Type: {today.precipType
                                        ? today.precipType
                                        : 'none'}
                                    </p>
                                    <p>
                                        Chance: {toPercent(today.precipProbability)}%
                                    </p>
                                </div>
                                <div>
                                    <h5>Sun:</h5>
                                    <p>
                                        Sunrise: {new Date(today.sunriseTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                                    </p>
                                    <p>
                                        Sunset: {new Date(today.sunsetTime * 1000).toLocaleTimeString((navigator.language), {hour: '2-digit', minute: '2-digit'})}
                                    </p>
                                </div>
                                <div>
                                    <h5>Wind: MPH</h5>
                                    <p>
                                        Speed: {today.windSpeed.toFixed(1)}
                                    </p>
                                    <p>
                                        Gust: {today.windGust.toFixed(1)}
                                    </p>
                                    <p>
                                        Direction: {today.windBearing}&#176;
                                    </p>
                                </div>
                                <div>
                                    <h5>Other:</h5>
                                    <p>
                                        Cloud Cover: {toPercent(today.cloudCover)}%
                                    </p>
                                    <p>
                                        Pressure: {today.pressure}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Humidity: {toPercent(today.humidity)}%
                                    </p>
                                    <p>
                                        Dew Point: {today.dewPoint.toFixed(1)}&#176;F
                                    </p>
                                </div>
                                    
                            </div>
                            <h3 className="align-center">
                                Hourly:
                            </h3>
                            
                            <div className="Weather-hourly-data">
                                <div className="Weather-hourly-table-head">
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
                                        Humidity:
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
                                </div>
                                <div className="Weather-hourly-map">
                                    {hourlyMap}
                                </div>
                            </div>
                            <h3 className="align-center">This Week:</h3>
                            {thisWeekMap}
                                
                        </div>
                    :this.state.loading}
                        
                        {/* {help.forecast.currently} */}
                        {/* {this.state.weatherData.forecast.currently.temperature} */}
                    </div>
                </div>
    		</div>
    	);
    }
}
export default Weather;