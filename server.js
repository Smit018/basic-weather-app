const express=require('express');
const https=require('https');
const bodyparser=require('body-parser');
const { response } = require('express');

const app=express();
app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");


    
})

app.post("/",function(req,res){
        var city=req.body.cityname;
        var query=city;
    const appid="8f8e54251be05bb11429270774724c09";
    const units="metric";
      const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units+"";
    https.get(url,function(response){
        
    
    response.on("data",function(data){
        const weatherdata=JSON.parse(data)
        const temperature=weatherdata.main.temp
        const description=weatherdata.weather[0].description
        const icon=weatherdata.weather[0].icon
        const imgurl="http://openweathermap.org/img/wn/"+ icon+ "@2x.png"
        res.write("<h1>The temperature in "+ query + " is " + temperature + " degree celcius</h1>")
        res.write("<p1>The condition in "+query+" is " + description+" </p1>");
        res.write('<img src='+imgurl+">")
        res.send();

    })
})
})









app.listen(3000,function(){
    console.log("Server is running on port 3000")
});
