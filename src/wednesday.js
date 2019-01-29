module.exports = {
  myLocation: myLocation,
  weatherService: weatherService,
  randomWednesdayQuote: randomWednesdayQuote
};

const axios = require("axios");

function randomWednesdayQuote() {
  const quotes = [
    "Mon cher.",
    "Nobody gets out of the Bermuda Triangle, not even for a vacation. Everyone knows that.",
    "Are they made from real Girl Scouts?",
    "If I wanted to kill my husband, I'd do it, and I wouldn't get caught.",
    "I'll clean my room. In exchange for your immortal soul.",
    "Do not trust the Pilgrims, especially Sarah Miller.",
    "Don't be a baby. I know what I'm doing."
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function myLocation() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      position => {
        let coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        resolve(coordinates);
      },
      error => {
        let errorMessage;
        switch (error.code) {
          case 1:
            errorMessage = "Permission denied";
            break;
          case 2:
            errorMessage = "Position unavailable";
            break;
          case 3:
            errorMessage = "Timed out";
            break;
          default:
            errorMessage = "Unknown error";
        }
        reject(errorMessage);
      }
    )
  );
}

function weatherService() {
  return new Promise((resolve, reject) => {
    myLocation()
      .then(coords => {
        coords.latitude = Number(coords.latitude).toFixed(4);
        coords.longitude = Number(coords.longitude).toFixed(4);
        axios
          .get(`api/weather/${coords.latitude},${coords.longitude}`)
          .then(response => {
            resolve(response.data); //response.data b/c it's an axios call
          })
          .catch(e => reject(`Error getting weather: ${e}`));
      })
      .catch(e => reject(`Error getting location: ${e}`));
  });
}
