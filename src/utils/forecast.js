const request = require('request');

const forecast = (lat,long, callback ) => {

    const url = `http://api.weatherstack.com/current?access_key=1521335bd834ae9ce7dce67e2440c538&query=${lat},${long}&units=m`

    request({url,json:true},(error,{body} = {}) => {
        if(error){
            callback('Unable to connect to weather API')
        } else if(body.error) {

             callback('Unable to find location')
            
        }else {
               const current = body.current
               callback(undefined,
                `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out, however it feels like ${current.feelslike} degrees.`
                )
            }
    })

}

module.exports = forecast;