const path = require("path")
const express = require('express');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast =  require("./utils/weatherStack");

const app = express();
const port = process.env.PORT || 3000;

//console.log(__dirname)//directory --> /Users/valv/Desktop/UDMY/web-server/src
//console.log(__filename)//filepath


//HBS CONFIG
app.set("view engine", "hbs")
const viewsPath = path.join(__dirname, "../templates/views")
const viewsPath2 = path.join(__dirname, "../templates2")
app.set("views", [viewsPath,viewsPath2])
const partialPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialPath)


//TO USE STATIC FILES
const publicDirectory = path.join(__dirname,"../public")
//always static pages --- hardcoded html
// Express checks routes in the order they are declared, and since index.html is a default filename which is used by static middleware, it shows index.html content.
app.use(express.static(publicDirectory)) //-->returns the static files which gets used by app,USes the static files in this directory
//we dont have a about route , but since we use static middleware we can go to about.html and it will serve file



//ROUTES
app.get("/",(request,response)=>{
    //dynamic pages render using the hbs view engine -> automatic refernce to views folder
    response.render("index",{
        title:"Weather App",
        name:"VALMAN"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About page",
        name:"Valman"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"VALMAN",
        helpText:"This is some good help"
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404page",{
        title:"404",
        message:"Help article not found",
        name:"Valman"
    })
})

app.get("/redirect",(req,res)=>{
    res.redirect("TweetToGram://")
})

app.get("/weather",(req,res)=>{

    if(req.query.address){
        const address = req.query.address
        geocode(address,(error,{long,lat,place} = {})=>{
            if(!error){
                forecast(lat,long,(error,data)=>{
                    if(error){
                        res.send({error:error})
                    }
                    else{
                        res.send({
                            forecast:data,
                            place:place,
                            address:address
                        })
                    }
                })
            }
            else{
                res.send({error:error})
            }
        })
        return
    }
    else{
        res.send({error:"Need to provide an address"})
    }

})

app.get("/nodejs",(req,res)=>{
    res.render("nodejs")
})

//404 page should be last ->Match anything with this ->if put in first directly goes to this.
app.get("*",(req,res)=>{
    res.render("404page",{
        title:"404",
        message:"The page you are looking for is not available",
        name:"Valman"
    })
})


//SERVER
app.listen(port,()=>{
    console.log("PORT")
}); //devlopment port 3000