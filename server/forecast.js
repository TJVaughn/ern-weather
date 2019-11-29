const request = require('request');

// THE SOLE PURPOSE IS TO GET THE JSON DATA FROM THE DARK SKY API

const forecast = (lat, long, name, callback) => {
    const key = "21d84f83927a2f30788834bdb7bdc322";
    const url =  `https://api.darksky.net/forecast/${key}/${lat},${long}`
    // console.log(url)
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback(error, undefined)
        } else if(body.error) {
            callback(error, undefined)
        } else {
            const weather = {
                data: body,
                place: name
            }
            // callback(weather)
            const {data, place} = weather
            callback(undefined, {data, place})
        }
    }) 
}

module.exports = forecast;
