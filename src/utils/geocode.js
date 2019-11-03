const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2l2YW5vbHkiLCJhIjoiY2syaHRjdzF3MTYwZzNmbzIzM3JreWo1ZyJ9.F_YA_xL5dDxzrk_ncjcpLA&limit=1';
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable connect to the map service.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable find the location.', undefined);
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lng: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
};

module.exports = geoCode;