module.exports = {
  todaysDate: todaysDate,
  myLocation: myLocation,
  weather: weather,
  weatherIcon: weatherIcon,
  isItDayOrNight: isItDayOrNight
};

let axios = require("axios");

function todaysDate(format) {
  const today = new Date();
  const day = today.getDate();
  const m = today.getMonth() + 1;
  const year = today.getFullYear();
  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let output = String(format).toLowerCase();

  // format year
  if (output.indexOf("yyyy") !== -1) {
    output = output.replace("yyyy", year);
  } else {
    output = output.replace("yy", String(year).substring(2));
  }
  //format day
  if (output.indexOf("dd") !== -1) {
    output = output.replace("dd", doubleDigit(day));
  } else {
    output = output.replace("d", day);
  }
  //format month
  if (output.indexOf("mmmm") !== -1) {
    output = output.replace("mmmm", months[m]);
  } else if (output.indexOf("mmm") !== -1) {
    output = output.replace("mmm", String(months[m]).substring(0, 3));
  } else if (output.indexOf("mm") !== -1) {
    output = output.replace("mm", doubleDigit(m));
  } else if (output.indexOf("m") !== -1) {
    output = output.replace("m", String(m));
  }

  return output;
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

function weather(latitude, longitude, units, apiKey) {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`
  );
}

function isItDayOrNight(sunset) {
  const currentTime = Date.now();
  if (Number(sunset) > currentTime) return "day";
  if (Number(sunset) < currentTime) return "night";
}

function weatherIcon(weatherCode, dayOrNight) {
  let icon = "unavailable";
  const conditionPrefix = String(weatherCode).substr(0, 1);
  switch (conditionPrefix) {
    case "2":
      icon = "thunderstorm.png";
      break;
    case "3":
      icon = "rain_light.png";
      break;
    case "5":
      switch (Number(weatherCode)) {
        case 500:
          icon = "rain_light.png";
          break;
        case 501:
          icon = "rain.png";
          break;
        default:
          icon = "rain_heavy.png";
      }
      break;
    case "6":
      icon = "snow.png";
    case "7":
      icon = "fog.svg";
      break;
    case "8":
      switch (weatherCode > 802) {
        case true:
          icon = "cloud.png";
          break;
        default:
          const sunOrMoon = dayOrNight === "day" ? "sun" : "moon";
          if (Number(weatherCode) === 800) icon = `${sunOrMoon}.png`;
          if (Number(weatherCode) === 801 || weatherCode === 802)
            icon = `cloud_${sunOrMoon}.png`;
      }
      break;
    default:
      alert("prefix not 2,3,5,6,7, or 8");
  }
  return icon;
}
function doubleDigit(i) {
  return i < 10 ? "0" + String(i) : String(i);
}
