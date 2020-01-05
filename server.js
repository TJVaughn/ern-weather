const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const coordinates = require('./server/coordinates');
const forecast = require('./server/forecast')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const forceSSLAndWWW = (req, res, next) => {
    console.log(req.headers)

    if(process.env.NODE_ENV === 'production' && req.header('host') !== 'www.whetherapp.co'){
        res.redirect(301, 'https://www.whetherapp.co')
    }

    if(process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https'){
        console.log(req.hostname)
        console.log(req.url)
        // return res.redirect(301, 'https://' + req.hostname)
        return res.redirect(301, `https://${req.hostname}`)
    }

    return next();
}
app.use(forceSSLAndWWW)


app.get('/user', (req, res) => {
    return res.send({
        userIP: req.connection.remoteAddress
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address in the search area"
        })
    }
    coordinates(req.query.address, (error, {lat, long, name} = {}) => {
        if(error) {
            return res.send({
                error: "coordinates failed"
            })
        }

        forecast(lat, long, name, (error, weather) => {
            if(error){
                return res.send({
                    error: "forecast failed"
                })
            }
            res.send({
                forecast: weather.data,
                name,
                address: req.query.address
            })
        })
    });
})


if (process.env.NODE_ENV === 'production') {
    
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
      
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.listen(port, () => console.log(`Listening on port ${port}`));