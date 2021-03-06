import WeatherService from "./services/weatherService.js"
import express from "express"

const app = express()
const port = process.env.PORT || 5000

app.set("port", port)

app.use(express.static(`${__dirname}/public`))

// views is directory for all template files
app.set("views", `${__dirname}/views`)
app.set("view engine", "ejs")

app.get("/weather/cities/:cityId", (request, response) => {
    WeatherService().getWeather(request.params.cityId).then(weather => response.json(weather))
})

app.get("/weather/cities/name/:name", (request, response) => {
    WeatherService()
        .getCities(request.params.name)
        .then(cities => response.json(cities))
        .catch(err => {
            response.status(406)
            response.json({ message: "City name should have at least two characters" })
        })
})

app.listen(app.get("port"), () => {
    console.log(`Node app is running on port ${port}`)
})
