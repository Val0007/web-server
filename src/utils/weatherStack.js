const request = require('request');


const forecast = (lat,long,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=d92810226225f6f53d974f68b4711bd6&query=${lat},${long}&units=m`
    request(
        {url,json:true},
        
        function(err,{body}){
    
        // const data  = JSON.parse(res.body) //its synchronous
        // console.log(data.current)
    
            if (err){
                callback("Unable to connect to weatherstack",undefined)
            }
            else if(body.error){
                callback("Proper parameters are required.",undefined)
            }
            else{
                const data = body
                callback(undefined,`It is currently ${data.current.temperature},feels like ${data.current.feelslike}. This is due to a new push. `)
                }
    
    })
}

module.exports = forecast