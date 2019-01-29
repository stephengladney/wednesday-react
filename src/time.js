module.exports = {
  todaysDate: todaysDate,
  timeNow: timeNow,
  isItDayOrNight: isItDayOrNight,
  abbreviateWeekday: abbreviateWeekday,
  nextFiveWeekdays: nextFiveWeekdays,
  toTwelveHour: toTwelveHour,
  toDoubleDigit: toDoubleDigit,
  standardizeTime: standardizeTime,
  militarizeTime: militarizeTime,
  abbreviateTime: abbreviateTime,
  secondsToMinutes: secondsToMinutes
};

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

function currentWeekday() {
  return days[new Date().getDay()];
}

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

function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes}:${toDoubleDigit(seconds)}`;
}

function timeNow(format = 12 /* || 24 */) {
  const today = new Date(),
    h = today.getHours(),
    m = today.getMinutes();

  return format === 24
    ? `${toDoubleDigit(h)}:${toDoubleDigit(m)}`
    : `${toTwelveHour(h)}:${toDoubleDigit(m)} ${addAmPm(h)}`;
}

function abbreviateTime(time) {
  const timeArray = time.split("");
  const removed = timeArray.splice(timeArray.indexOf(":"), 4);
  return timeArray.join("");
}

function isItDayOrNight(sunset) {
  const currentTime = Date.now();
  if (Number(sunset) > currentTime) return "day";
  if (Number(sunset) < currentTime) return "night";
}

function doubleDigit(i) {
  return i < 10 ? "0" + String(i) : String(i);
}
