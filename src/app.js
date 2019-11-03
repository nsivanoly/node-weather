const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

/*
 Define paths for Express Configs
*/
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/*
 Setup HBS and views location
*/
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/*
 Setup Static path
*/
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'N Sivanoly'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'N Sivanoly',
        img: './img/me.png'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help App',
        name: 'N Sivanoly',
        msg: 'Message'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address term is required.'
        });
    }

    const address = req.query.address;

    geoCode(address, (error, {lat, lng, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(lat, lng, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send(
                {
                    forecast: forecastData,
                    location: location,
                    address: address,
                }
            );
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        name: 'N Sivanoly'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'N Sivanoly',
        img: '/img/me.png'
    });
});

app.listen(3000, () => {
    console.log('Server is started on 3000');
});
