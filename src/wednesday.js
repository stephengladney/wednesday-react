module.exports = {
  myLocation: myLocation,
  weatherService: weatherService,
  randomWednesdayQuote: randomWednesdayQuote,
  getCookie: getCookie,
  setCookie: setCookie
};

const axios = require("axios");

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function randomWednesdayQuote() {
  const quotes = [
    "Mon cher.",
    "Nobody gets out of the Bermuda Triangle, not even for a vacation. Everyone knows that.",
    "Are they made from real Girl Scouts?",
    "If I wanted to kill my husband, I'd do it, and I wouldn't get caught.",
    "I'll clean my room. In exchange for your immortal soul.",
    "Do not trust the Pilgrims, especially Sarah Miller.",
    "Don't be a baby. I know what I'm doing.",
    "Be afraid. Be very afraid.",
    "This is my costume. I'm a homicidal maniac. They just look like everyone else.",
    "You severely underestimate my apathy.",
    "I hate everything."
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
    axios
      .get("api/tesla/state/drive")
      .then(apiResponse => {
        apiResponse.data.response.latitude = Number(
          apiResponse.data.response.latitude
        ).toFixed(4);
        apiResponse.data.response.longitude = Number(
          apiResponse.data.response.longitude
        ).toFixed(4);
        console.log(apiResponse.data.response.latitude);
        console.log(apiResponse.data.response.longitude);
        axios
          .get(
            `api/weather/${apiResponse.data.response.latitude},${
              apiResponse.data.response.longitude
            }`
          )
          .then(response => {
            resolve(response.data); //response.data b/c it's an axios call
          })
          .catch(e => reject(`Error getting weather: ${e}`));
      })
      .catch(e => reject(`Error getting location: ${e}`));
  });
}
