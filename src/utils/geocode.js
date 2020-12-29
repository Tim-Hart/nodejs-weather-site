const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGltYm9iODgiLCJhIjoiY2tpbmRkNW5iMTA1aDJxbGJsYXR5MGp3YSJ9.EFjGp9y6REVMgplXcWz8Ww&limit=1`

    request({url, json:true}, (error, {body}) => {

        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if (body.features.length === 0 ){
            callback('Unable to find location, try another search', undefined)
        }else{

            const features = body.features[0]

            const long = features.center[0]
            const lat = features.center[1]
            const name = features.place_name
            callback(undefined, {
               
                latitude:lat,
                longitude:long,
                location: name

            })
        }

    })

}


module.exports = geoCode