const request = require('request')

const weatherUrl = 'https://api.darksky.net/forecast/981d421fbdb09cfd06a7bac07596da7d/'

const forecast = (lat, lon, callback) => {
  const url = weatherUrl + lat + ',' + lon +'?units=si&lang=nl'
  let body = ''
  request({ url, json:true}, (error, result) => {
    if(result) {
      body = result.body
    }
    if(error) {
      callback('Error connecting the Darksky weather', undefined)
    } else if( body.error) {
      callback('Error from Darksky. Errorcode: ' + body.code + ', ' + body.error, undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + ' Het is nu ' + body.currently.temperature + ' graden. Er is een ' + body.currently.precipProbability * 100 + '% kans op regen.' + ' De luchtdruk is ' + body.currently.pressure + ' Hpa')
    }
  })
}


module.exports = forecast