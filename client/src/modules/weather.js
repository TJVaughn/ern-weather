import React, { Component } from 'react';
import { toPercent, callWeatherAPI } from './utils';
import {callAlertsMap, alertsMap} from './Alerts';
import {callDayMap, thisWeekMap} from './CallDayMap';
import {handleHourlyMap, hourlyMap } from './HourlyMap';
import { setSearchCookie, getSearchCookie } from './cookies'
import ReactGa from 'react-ga';

ReactGa.initialize('UA-136509113-9');
ReactGA.pageview(window.location.pathname + window.location.search);

let weatherArray = []
let curr = []
let dayArray = []
let alerts = []

let hourlyArray = []
let today = []
let userSearch = ''

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
        // this.handleDayOfWeek = this.handleDayOfWeek.bind(this)
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
            handleHourlyMap(hourlyArray)
            today = dayArray.shift()
            callDayMap(dayArray);
            if(weatherArray.forecast.alerts) {
                alerts = weatherArray.forecast.alerts;
                if(alerts.length > 0) {
                    this.setState({alertSwitch: true})
                    callAlertsMap(alerts)
                }
            }
            this.setState({error: res.error})
            // We will remove the loading message
            this.setState({loading: ''})
            // We set switch to true which will now render all the data
            this.setState({switch: true})
            //Because everything has worked at this point, we will reset error switch to false
            this.setState({errorSwitch: false})
            setSearchCookie("search", this.state.input, 30)
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
        userSearch = getSearchCookie('search')
        if(userSearch === '') {
            return '';
        }
        this.setState({switch: false})
        this.setState({alertSwitch: false})
        this.setState({loading: '...getting forecast'})
        callWeatherAPI(userSearch).then((res) => {
            // Set error to true ...
            this.setState({errorSwitch: true})
            weatherArray = res;
            curr = weatherArray.forecast.currently;
            dayArray = weatherArray.forecast.daily.data;
            hourlyArray = weatherArray.forecast.hourly.data;
            // console.log(hourlyArray)
            handleHourlyMap(hourlyArray)
            today = dayArray.shift()
            console.log(today)
            callDayMap(dayArray);
            if(weatherArray.forecast.alerts) {
                alerts = weatherArray.forecast.alerts;
                if(alerts.length > 0) {
                    this.setState({alertSwitch: true})
                    callAlertsMap(alerts)
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