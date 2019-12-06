import React, { Component } from 'react';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            cookiePolicy: true
        }
        this.handleCookieSwitch = this.handleCookieSwitch.bind(this)
    }

    handleCookieSwitch(){
        if(this.state.cookiePolicy){
            this.setState({cookiePolicy: false})
        } else {
            this.setState({cookiePolicy: true})
        }
    }
    render(){
    	return(
    		<div>
    			<div className="footer">
                    <hr />
                    Created by <a href="https://vaughnwebdevelopment.com">Trevor Vaughn</a> <br />
                </div>
                <a target="_blank" rel="noopener noreferrer" href="https://darksky.net/poweredby/">Powered by Darksky.net</a> for
                 the weather data and <a target="_blank" rel="noopener noreferrer" href="https://www.mapbox.com/">Mapbox.com</a> for 
                    geocoding the search term.
                    {this.state.cookiePolicy
                    ? <div className="cookie-policy" onClick={this.handleCookieSwitch}>
                            Hey, we use a cookie to remember your search term for 30 days, and another one for analytics purposes, but 
                            that's it! <button>Accept</button>
                    </div>
                    :''}
                    <div className="Margin-bottom-50"></div>
    		</div>
    	);
    }
}
export default Footer ;