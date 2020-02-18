const request = require('request')

// THE SOLE PURPOSE OF THIS FUNCTION IS TO GET THE COORDINATES OF THE SEARCH QUERY
const coordinates = (searchText, callback) => {
    const key = "pk.eyJ1IjoidGp2YXVnaG4iLCJhIjoiY2szODZpc2U1MDAzcTNwbW9pNWJxbjQ0diJ9.NnNQw6riCTEDX9-ukgAvlw"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${key}&limit=1`
    // console.log(mapBoxUrl);
    request({url, json: true}, (error, { body }={}) => {
        if(error){
            callback(error, undefined);
        } else if(body.message || body.features.length < 1) {
            console.log(body.message)
            callback(body.message, undefined);
        } else {
            // console.log("Mapbox API response")

            // console.log([res.body.features[0].center[1], res.body.features[0].center[0]]);
            const data = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                name: body.features[0].place_name
            }
            const {lat, long, name} = data;
            // console.log(lat, long, name)
            // callback(undefined, data)
            callback(undefined, {lat, long, name})
        }
    })
}

module.exports = coordinates