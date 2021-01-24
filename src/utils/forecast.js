//const request = require('postman-request')
const request = require('request')

const forecast = (lat, long, callback) => {

const url='http://api.weatherstack.com/current?access_key=6f4bb2c361ad7632fefb4615373f4928&query='+  encodeURIComponent(lat) +','+ encodeURIComponent(long) + '&units=m'

request({url, json:true}, (error, {body}) => {
    
    if (error) {
        callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
        callback('unable to find weather for this location'+lat+' '+long, undefined)  
    }
    else {
        callback(undefined, 
            body.current.weather_descriptions[0]+' with a temperature of: '+
            body.current.temperature+ ' which feels like '+
            body.current.feelslike
        )
    }
})
}

module.exports = forecast