import React, { Component } from 'react';

class Weather extends Component {
    constructor(props){
        super(props);
        this.state = {
            input: '',
            weatherData: [],
            error: '',
            currently: [],
            forecast: [],
            switch: false,
            loading: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    callWeatherApi = async () => {
        const input = encodeURIComponent(this.state.input)
        const response = await fetch(`/weather?address=${input}`)
        const body = await response.json();
        return body;
    }

    handleChange(evt){
        this.setState({input: evt.target.value})
    }
    
    handleSubmit(evt){
        evt.preventDefault();
        this.setState({switch: false})
        this.setState({loading: '...loading'})
        this.callWeatherApi().then((res) => {
            // console.log(res)
            this.setState({weatherData: res})
            this.setState({currently: res.forecast.currently})
            this.setState({forecast: res.forecast.daily})
            this.setState({switch: true})
            // console.log(this.state.currently)
            console.log(this.state.forecast)
            console.log(this.state.weatherData)
        }).catch(err => console.log(err))
    }

    toPercent(dec){
        return Math.round(dec * 100);
    }
    
    render(){
    	return(
    		<div>
    			<form onSubmit={this.handleSubmit}>
                    <label>Location: </label>
                    <input value={this.state.input} onChange={this.handleChange} />
                    <button>Get</button>
                </form>
                <div>
                    <h2>
                        {this.state.weatherData.name}
                    </h2>
                    <div>
                        {this.state.switch
                        ? <div>
                            <h4>Currently</h4>
                            <div className="Weather-container">
                                <p>
                                    {this.state.currently.summary}
                                </p>
                                <p>
                                    Temp: {this.state.currently.temperature}F
                                </p>
                                <p>
                                    Humidity: {this.toPercent(this.state.currently.humidity)}%
                                </p>
                                <p>
                                    Chance of Precipitation: {this.toPercent(this.state.currently.precipProbability)}%
                                </p>
                                <p>
                                    Wind Speed: {this.state.currently.windSpeed}mph
                                </p>
                                <p>
                                    Wind Direction: from {this.state.currently.windBearing}deg
                                </p>
                                <p>
                                    Wind Gust: {this.state.currently.windGust}mph
                                </p>
                                <p>
                                    Visibility: {this.state.currently.visibility} miles
                                </p>
                                
                            </div>
                            <h4>Today:</h4>
                            <div className="Weather-container">
                                <p>
                                    {this.state.forecast.data[0].summary}
                                </p>
                                <p>
                                    High: {this.state.forecast.data[0].temperatureHigh}F
                                </p>
                                <p>
                                    Low: {this.state.forecast.data[0].temperatureLow}F
                                </p>
                                <p>
                                    Humidity: {this.toPercent(this.state.forecast.data[0].humidity)}%
                                </p>
                                <p>
                                    {this.state.forecast.data[0].precipType}
                                </p>
                                <p>
                                    Chance of Precipitation: {this.toPercent(this.state.forecast.data[0].precipProbability)}%
                                </p>
                                <p>
                                    Wind Speed: {this.state.forecast.data[0].windSpeed}mph
                                </p>
                                <p>
                                    Wind Gust: {this.state.forecast.data[0].windGust}mph
                                </p>
                                <p>
                                    Wind Direction: from {this.state.forecast.data[0].windBearing}deg
                                </p>
                            </div>
                            
                            {/* <h3>On the Horizon</h3> */}
                            <h4>Tomorrow:</h4>
                            <div className="Weather-container">
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
                                    Humidity: {this.toPercent(this.state.forecast.data[1].humidity)}%
                                </p>
                                <p>
                                    {this.state.forecast.data[1].precipType}
                                </p>
                                <p>
                                    Chance of Precipitation: {this.toPercent(this.state.forecast.data[1].precipProbability)}%
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
                            </div>
                            
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