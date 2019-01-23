module.exports = {
  todaysDate: todaysDate,
  timeNow: timeNow,
  myLocation: myLocation,
  getWeatherByLocation: getWeatherByLocation,
  weatherIcon: weatherIcon,
  isItDayOrNight: isItDayOrNight,
  abbreviateWeekday: abbreviateWeekday,
  nextFiveWeekdays: nextFiveWeekdays,
  weatherService: weatherService,
  toTwelveHour: toTwelveHour,
  toDoubleDigit: toDoubleDigit,
  standardizeTime: standardizeTime,
  militarizeTime: militarizeTime
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

function standardizeTime(raw) {
  const time = new Date(raw * 1000);
  const h = time.getHours();
  const m = time.getMinutes();
  return `${toTwelveHour(h)}:${toDoubleDigit(m)} ${addAmPm(h)}`;
}

function militarizeTime(raw) {
  const time = new Date(raw * 1000);
  const h = time.getHours();
  const m = time.getMinutes();
  return `${toDoubleDigit(h)}:${toDoubleDigit(m)}`;
}

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

function toDoubleDigit(i) {
  return i < 10 ? "0" + String(i) : String(i);
}

function toTwelveHour(i) {
  if (i == 0) {
    return 12;
  } else if (i > 12) {
    return i - 12;
  } else {
    return i;
  }
}

function addAmPm(i) {
  return i < 12 ? "AM" : "PM";
}

function timeNow(format = 12 /* || 24 */) {
  const today = new Date(),
    h = today.getHours(),
    m = today.getMinutes();

  return format === 24
    ? `${toDoubleDigit(h)}:${toDoubleDigit(m)}`
    : `${toTwelveHour(h)}:${toDoubleDigit(m)} ${addAmPm(h)}`;
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
          .then(data => {
            resolve(data.data);
          })
          .catch(e => reject(`Error getting weather: ${e}`));
      })
      .catch(e => reject(`Error getting location: ${e}`));
  });
}

// This function has been deprecated...
// function updateLocationBasedInfo() {
//   let finalResponse = {};
//   return new Promise((resolve, reject) =>
//     myLocation()
//       .catch(err => reject(`Error getting location: ${err}`))
//       .then(coords => {
//         finalResponse.latitude = coords.latitude;
//         finalResponse.longitude = coords.longitude;
//         getWeatherByLocation(
//           process.env.REACT_APP_DARKSKY_SECRET_KEY,
//           Number(coords.latitude).toFixed(4),
//           Number(coords.longitude).toFixed(4)
//         )
//           .then(response => {
//             let weather = {
//               icon: weatherIcon(
//                 response.data.weather[0].id,
//                 isItDayOrNight(response.data.sys.sunset)
//               ),
//               description: response.data.currently.summary,
//               temperature: Number(response.data.temperature).toFixed(),
//               high: Number(response.data.main.temp_max).toFixed(), // <---------HERE
//               low: Number(response.data.main.temp_min).toFixed(),
//               humidity: response.data.main.humidity,
//               wind: response.data.wind.speed,
//               sunrise: response.data.sys.sunrise,
//               sunset: response.data.sys.sunset,
//               clouds: response.data.clouds.all
//             };
//             finalResponse.weather = weather;
//             resolve(finalResponse);
//           })
//           .catch(err => {
//             finalResponse.weather = {
//               icon: "unavailable",
//               description: `Weather unavailable (${err})`
//             };
//             reject(finalResponse);
//           });
//       })
//   );
// }

function getWeatherByLocation(apiKey, latitude, longitude) {
  return axios.get(
    `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`
  );
}

function isItDayOrNight(sunset) {
  const currentTime = Date.now();
  if (Number(sunset) > currentTime) return "day";
  if (Number(sunset) < currentTime) return "night";
}

function weatherIcon(condition) {
  // sleet, wind
  const icons = {
    "clear-day": "sun.png",
    "clear-night": "moon.png",
    rain: "rain.png",
    snow: "snow.png",
    fog: "fog.svg",
    cloudy: "cloud.png",
    "partly-cloudy-day": "cloud_sun.png",
    "partly-cloudy-night": "cloud_moon.png",
    default: "n/a"
  };
  return icons[condition] || icons.default;
}
function doubleDigit(i) {
  return i < 10 ? "0" + String(i) : String(i);
}
