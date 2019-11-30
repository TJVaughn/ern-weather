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
        return thisWeekMap = array.map(item => 
            <div key={`${item.time}-key`}>
                <h4>{`${this.handleDayOfWeek(item.time)}:`}</h4>
                <div className="Weather-container">
                    <p>
                        {item.summary}
                    </p>
                    <p>
                        High: {item.temperatureHigh}F
                    </p>
                    <p>
                        Low: {item.temperatureLow}F
                    </p>
                    <p>
                        Humidity: {toPercent(item.humidity)}%
                    </p>
                    <p>
                        {item.precipType}
                    </p>
                    <p>
                        Chance of Precipitation: {toPercent(item.precipProbability)}%
                    </p>
                    <p>
                        Wind Speed: {item.windSpeed}mph
                    </p>
                    <p>
                        Wind Gust: {item.windGust}mph
                    </p>
                    <p>
                        Wind Direction: from {item.windBearing}deg
                    </p>
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
            <div key={`key-time-${item.time}`}>
                <h5>
                    {new Date(item.time * 1000).toLocaleTimeString()}
                </h5>
                <div className="">
                    <p>
                        <img className="summary-icon" src={this.handleHourlyIcon(item.summary)} alt={item.summary} />
                    </p>
                    <p>
                        {item.temperature}F
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
                        {item.windSpeed}mph
                    </p>
                    <p>
                        {item.windGust}mph
                    </p>
                    <p>
                        {item.windBearing}deg
                    </p>
                </div>
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
            console.log(hourlyArray)
            this.handleHourlyMap(hourlyArray)
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
            console.log(weatherArray)
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
                            
                            <h4>Currently:</h4>
                            <div className="Weather-container">
                                <p>
                                    {curr.summary}
                                </p>
                                <p>
                                    Temp: {curr.temperature}F
                                </p>
                                <p>
                                    Humidity: {toPercent(curr.humidity)}%
                                </p>
                                <p>
                                    Chance of Precipitation: {toPercent(curr.precipProbability)}%
                                </p>
                                <p>
                                    Wind Speed: {curr.windSpeed}mph
                                </p>
                                <p>
                                    Wind Direction: from {curr.windBearing}deg
                                </p>
                                <p>
                                    Wind Gust: {curr.windGust}mph
                                </p>
                                <p>
                                    Visibility: {curr.visibility} miles
                                </p>   
                            </div>
                            <h4>
                                Hourly:
                            </h4>
                            
                            <div className="Weather-hourly-data">
                                <div className="Weather-hourly-table-head">
                                    <h5>Time:</h5>
                                    <p id="hourly-summary">
                                        Summary:
                                    </p>
                                    <p>
                                        Temp:
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
                                        Wind:
                                    </p>
                                    <p>
                                        Gust:
                                    </p>
                                    <p>
                                        Direction
                                    </p>
                                </div>
                                <div className="Weather-hourly-map">
                                    {hourlyMap}
                                </div>
                            </div>
                            <h4>This Week:</h4>
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