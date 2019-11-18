request = require('request')

const mapbox_token = 'pk.eyJ1Ijoiam9zamciLCJhIjoiY2syaXY0NHQxMGpoNzNjbnYwbXZ1NjZ3cCJ9.hL0JMGHcx3RH1DiFosQ0ag'
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const geocode = (address, callback) => {
  const url = geocodeURL + encodeURIComponent(address) + '.json?access_token=' + mapbox_token + '&limit=1'
  request({url, json: true}, (error, {body} = {}) => {
    if(error) {
      callback('Errror connecting the mapbox', undefined)
    } else if (!body.features) {
      callback('Error from mapbox: ' + body.message, undefined)
    } else if(body.features.length === 0) {
      callback('Invalid location, try another search', undefined)
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
