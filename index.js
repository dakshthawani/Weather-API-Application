import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
const app =express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",(req,res)=>{
     res.sendFile(__dirname + "/index.html")
})

app.post("/",(req,res)=>{
    var cityName = req.body.city
    var unitName = req.body.unit
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=5002d61070297170c8135a336f5ea068&units="+unitName
    https.get(url, (response) => {
  
        response.on('data', (d) => {
            const weatherData = JSON.parse(d)
            const cityTemp = weatherData.main.temp;
            const cityDesc = weatherData.weather[0].description
            const cityIcon = weatherData.weather[0].icon
            const iconURL = "https://openweathermap.org/img/wn/"+cityIcon+"@2x.png"
            res.write("<h1>Your city temp is: " +cityTemp + "</h1>")
            res.write("<p>city desc is: " + cityDesc + "</p>")
            res.write("<img src="+iconURL+"></img>")
            res.send()
        });
      
      })
})
app.listen(3000,()=>{
    console.log("Server is started at port 3000");
    
})