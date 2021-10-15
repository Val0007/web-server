const request = require('request');

const geoCode = (address,callback)=>{
    const add = encodeURIComponent(address) //accepts special characters
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${add}.json?access_token=pk.eyJ1IjoidmFsMDA4IiwiYSI6ImNrZDQ0MHNicDAwdm0ydXBoaXd2OW84cWUifQ.uoWosQLSxzMC8sWLkUM9qg`

    request({url:url,json:true},(err,res)=>{
        if(err){
            callback("Unable to connect to Services.",undefined)
        }
        else if(res.body.features.length == 0){
            callback("Unable to find location.",undefined)
        }
        else{
            const 
            { 
                geometry:{
                coordinates:[long,lat]
                },
                place_name:place
            }  = res.body.features[0]
            callback(undefined, {long,lat,place} )
        }
    })

}

module.exports = geoCode