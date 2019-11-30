import React, { Component } from 'react';

class Footer extends Component {
    render(){
    	return(
    		<div>
    			<div className="footer">
                    <hr />
                    Created by <a href="https://vaughnwebdevelopment.com">Trevor Vaughn</a> <br />
                </div>
                Thanks to <a target="_blank" rel="noopener noreferrer" href="https://darksky.net">Darksky.net</a> for the weather data
                    and <a target="_blank" rel="noopener noreferrer" href="https://www.mapbox.com/">Mapbox.com</a> for geocoding the search term
    		</div>
    	);
    }
}
export default Footer ;