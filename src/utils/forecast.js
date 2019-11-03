const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = 'https://api.darksky.net/forecast/de071af8652a12c15fb645d6139f3c22/' + encodeURIComponent(lat) + ',' + encodeURIComponent(lng);
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to access the weather service', undefined);
        } else if (body.error) {
            callback('Unable to find the weather detail for the location.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ', It is currently ' + body.currently.temperature + ' degree out, This high today is '+ body.daily.data[0].temperatureHigh + ' and a low of '+ body.daily.data[0].temperatureLow +'. Chance of raining is ' + body.currently.precipProbability + '% chance to rain');
        }
    })
};

module.exports = forecast;