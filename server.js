if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${req.body.latitude},${req.body.longitude}&aqi=no`;
  axios({
    url: url,
    responseType: "json",
  }).then((response) => res.json(response.data));
});

app.listen(3000, () => {
  console.log("Server Started");
});
