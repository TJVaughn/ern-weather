import React, { Component } from 'react';
import { toPercent, callWeatherAPI } from './utils'

let weatherArray = []
let curr = []
let dayArray = []
let alerts = []
let alertsMap = []

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
            console.log(alerts)
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
                    ? <h3>"Sorry, check your connection or provide a valid search term"</h3>
                    :''}


                    <div>
                        {/* RENDERS ALL THE CONTENT IF ITS BEEN FETCHED, OR NOTHING IF NOT */}
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
                                    <h4>Alerts!:</h4>
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

                            
                            <h4>Today:</h4>
                            <div className="Weather-container">
                                <p>
                                    {dayArray[0].summary}
                                </p>
                                <p>
                                    High: {dayArray[0].temperatureHigh}F
                                </p>
                                <p>
                                    Low: {dayArray[0].temperatureLow}F
                                </p>
                                <p>
                                    Humidity: {toPercent(dayArray[0].humidity)}%
                                </p>
                                <p>
                                    {dayArray[0].precipType}
                                </p>
                                <p>
                                    Chance of Precipitation: {toPercent(dayArray[0].precipProbability)}%
                                </p>
                                <p>
                                    Wind Speed: {dayArray[0].windSpeed}mph
                                </p>
                                <p>
                                    Wind Gust: {dayArray[0].windGust}mph
                                </p>
                                <p>
                                    Wind Direction: from {dayArray[0].windBearing}deg
                                </p>
                            </div>
                            
                            {/* <h3>On the Horizon</h3> */}
                            <h4>Tomorrow:</h4>
                            {/* <div className="Weather-container">
                                <p>
                                    {this.state.forecast.data[1].summary}
                                </p>
                                <p>
                                    High: {this.state.forecast.data[1].temperatureHigh}F
                                </p>
                                <p>
                                    Low: {this.state.forecast.data[1].temperatureLow}F
                                </p>
                                <p>
                                    Humidity: {toPercent(this.state.forecast.data[1].humidity)}%
                                </p>
                                <p>
                                    {this.state.forecast.data[1].precipType}
                                </p>
                                <p>
                                    Chance of Precipitation: {toPercent(this.state.forecast.data[1].precipProbability)}%
                                </p>
                                <p>
                                    Wind Speed: {this.state.forecast.data[1].windSpeed}mph
                                </p>
                                <p>
                                    Wind Gust: {this.state.forecast.data[1].windGust}mph
                                </p>
                                <p>
                                    Wind Direction: from {this.state.forecast.data[1].windBearing}deg
                                </p>
                            </div> */}
                            
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
export default Weather ;