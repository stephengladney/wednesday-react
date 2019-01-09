module.exports = {
  todaysDate: todaysDate,
  myLocation: myLocation,
  getCurrentWeatherByLocation: getCurrentWeatherByLocation,
  weatherIcon: weatherIcon,
  isItDayOrNight: isItDayOrNight,
  abbreviateWeekday: abbreviateWeekday,
  nextFiveWeekdays: nextFiveWeekdays,
  updateLocationBasedInfo: updateLocationBasedInfo
};

let axios = require("axios");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function abbreviateWeekday(day) {
  switch (day) {
    case "Thursday":
      return "Thurs";
    default:
      return String(day).substr(0, 3);
  }
}
// const abbreviatedWeekdays = () =>
//   days.map(day => {
//     switch (day) {
//       case "Thursday":
//         return "Thur";
//       default:
//         return day.substr(0, 3);
//     }
//   });

const currentWeekday = () => days[new Date().getDay()];

function nextFiveWeekdays() {
  let currentDay = days.indexOf(currentWeekday());
  const nextFiveDays = [];
  for (let i = 1; i <= 5; i++) {
    switch (currentDay) {
      case days.length - 1:
        currentDay = 0;
        break;
      default:
        currentDay++;
    }
    nextFiveDays.push(days[currentDay]);
  }
  return nextFiveDays;
}

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

function updateLocationBasedInfo() {
  let finalResponse = {};
  return new Promise((resolve, reject) =>
    myLocation()
      .catch(err => alert(`Error getting location: ${err}`))
      .then(coords => {
        finalResponse.latitude = coords.latitude;
        finalResponse.longitude = coords.longitude;
        getCurrentWeatherByLocation(
          Number(coords.latitude).toFixed(4),
          Number(coords.longitude).toFixed(4),
          "imperial",
          process.env.REACT_APP_OPENWEATHER_KEY
        )
          .then(response => {
            let weather = {
              icon: weatherIcon(
                response.data.weather[0].id,
                isItDayOrNight(response.data.sys.sunset)
              ),
              description: response.data.weather[0].description,
              temperature: Number(response.data.main.temp).toFixed(),
              city: response.data.name,
              high: Number(response.data.main.temp_max).toFixed(),
              low: Number(response.data.main.temp_min).toFixed(),
              humidity: response.data.main.humidity,
              wind: response.data.wind.speed,
              sunrise: response.data.sys.sunrise,
              sunset: response.data.sys.sunset,
              clouds: response.data.clouds.all
            };
            finalResponse.weather = weather;
            resolve(finalResponse);
          })
          .catch(err => {
            finalResponse.weather = {
              weather_icon: "unavailable",
              weather_description: `Weather unavailable (${err})`
            };
          });
      })
  );
}

function getCurrentWeatherByLocation(latitude, longitude, units, apiKey) {
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
