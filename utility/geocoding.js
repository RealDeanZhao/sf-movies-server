var fetch = require('node-fetch');
var HttpProxyAgent = require('http-proxy-agent');

exports.getCoordinate = function (location, callback) {
    // add the proxy in case i am at office.
    var proxy = process.env.HTTP_PROXY;
    var options = { method: 'GET' };
    if (proxy && proxy !== '') {
        options.agent = new HttpProxyAgent(proxy);
    }
    var componentsQuery = 'components=country:US|administrative_area_level_1:CA|administrative_area_level_2:SF';
    var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${location}&${componentsQuery}`
    fetch(url, options).then(function (res) {
        return res.json();
    }).then(function (data) {
        var coordinate = {};
        
        if (data.status === 'OK') {
            //console.log(data.results);
            for (result of data.results) {
                if (result.geometry) {
                    coordinate.lat = result.geometry.location.lat;
                    coordinate.lng = result.geometry.location.lng;
                }
                break;
            }
        }

        callback(coordinate);
    }).catch(function (err) {
        //console.log(err);
        callback(coordinate);
    })
}