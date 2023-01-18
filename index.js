const body = document.querySelector("body");
//homepage elements
let homeDiv;
let homeTime;
let homeDate;
let timeDatePage;
let stopwatchButton;
let stopwatchButtonDiv;

//stopwatch elements
let stopwatchPage;
let stopwatchTime;
let buttnDiv;
let resetBttn;
let startBttn;
let stopBttn;
let timeButtonDiv;
let timeButton;

// time units
let millsec = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

//Interval Id's
let timerId;
let interval;

//timer elements
let stopTimer;
let appendMS;
let appendSec;
let appendMin;
let appendHr;

window.onload = homeFun();

function homeFun() {
  if (stopwatchPage != undefined) {
    stopwatchPage.remove();
  }
  homeDiv = document.createElement("div");
  homeDiv.setAttribute("id", "timeDatePage");
  homeTime = document.createElement("p");
  homeDate = document.createElement("p");
  stopwatchButtonDiv = document.createElement("div");
  stopwatchButton = document.createElement("button");
  stopwatchButton.innerHTML = "Stopwatch";

  //attributes
  homeTime.setAttribute("id", "time");
  homeDate.setAttribute("id", "date");
  stopwatchButtonDiv.setAttribute("id", "option");
  stopwatchButton.setAttribute("onClick", "stopwatchFun()");

  //append
  timerId = setInterval(doDate, 1000);
  homeDiv.appendChild(homeTime);
  homeDiv.appendChild(homeDate);
  stopwatchButtonDiv.appendChild(stopwatchButton);
  homeDiv.appendChild(stopwatchButtonDiv);
  body.prepend(homeDiv);
}

/************** function for home page timer to show current date and time ***********/
function doDate() {
  let time = "";
  let date = "";

  let days = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  let months = new Array(
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
  );

  let d = new Date();
  let mm = d.getMinutes();
  let ss = d.getSeconds();
  let hh = d.getHours();

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  time += hh + " : " + mm + " : " + ss;

  date +=
    days[d.getDay()] +
    ", " +
    d.getDate() +
    " " +
    months[d.getMonth()] +
    " " +
    d.getFullYear();
  document.getElementById("time").innerHTML = time;
  document.getElementById("date").innerHTML = date;
}

//Function to set attributes for reset and start button
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
}

// Stopwatch
function stopwatchFun() {
  //removing first page
  document.getElementById("timeDatePage").remove();

  //remove interval
  clearInterval(timerId);

  //creating stop watch page
  stopwatchPage = document.createElement("div");
  stopwatchPage.setAttribute("class", "stopwatchPage");
  stopwatchTime = document.createElement("p");
  stopwatchTime.innerHTML = `<span id = "h">00</span> : <span id = "m">00</span> : <span id = "s">00</span><span id = "ms"> .00</span>`;
  buttnDiv = document.createElement("div");
  resetBttn = document.createElement("button");
  startBttn = document.createElement("button");
  stopBttn = document.createElement("button");
  timeButtonDiv = document.createElement("div");
  timeButton = document.createElement("button");
  timeButton.innerHTML = "Time";
  resetBttn.innerHTML = "Reset";
  startBttn.innerHTML = "Start";
  stopBttn.innerHTML = "Stop";

  //attributes
  timeButtonDiv.setAttribute("id", "option");
  timeButton.setAttribute("onClick", "homeFun()");

  const resetAttributes = {
    id: "reset",
    onclick: "resetFun()",
  };

  const startAttributes = {
    id: "start",
    onclick: "startFun()",
  };

  const stopAttributes = {
    id: "stop",
    onclick: "stopFun()",
  };

  const stopTimeAttributes = {
    id: "time1",
  };

  //set attributes of elements
  setAttributes(resetBttn, resetAttributes);
  setAttributes(startBttn, startAttributes);
  setAttributes(stopBttn, stopAttributes);
  setAttributes(stopwatchTime, stopTimeAttributes);

  //Append elements
  buttnDiv.appendChild(startBttn);
  buttnDiv.appendChild(stopBttn);
  buttnDiv.appendChild(resetBttn);
  timeButtonDiv.appendChild(timeButton);

  stopwatchPage.appendChild(stopwatchTime);
  stopwatchPage.appendChild(buttnDiv);

  stopwatchPage.appendChild(timeButtonDiv);
  body.prepend(stopwatchPage);

  stopTimer = document.getElementById("time1");

  appendMS = document.getElementById("ms");
  appendSec = document.getElementById("s");
  appendMin = document.getElementById("m");
  appendHr = document.getElementById("h");
}

/*********** onclick functions for stopwatch ************************/

function startFun() {
  interval = setInterval(startTimer, 10);
}

//Timer
function startTimer() {
  millsec++;
  if (millsec < 10) {
    appendMS.innerHTML = ".0" + millsec;
  } else {
    appendMS.innerHTML = "." + millsec;
  }
  if (millsec == 100) {
    seconds++;
    if (seconds < 10) {
      appendSec.innerHTML = "0" + seconds;
    } else {
      appendSec.innerHTML = seconds;
    }
    millsec = 0;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
      if (minutes < 10) {
        appendMin.innerHTML = "0" + minutes;
      } else {
        appendMin.innerHTML = minutes;
      }
      if (minutes == 60) {
        hours++;
        if (hours < 10) {
          appendHr.innerHTML = "0" + hours;
        } else {
          appendHr.innerHTML = hours;
        }
        minutes = 0;
      }
    }
  }
}

//Rest Function
function resetFun() {
  millsec = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  stopTimer.innerHTML = `<span id = "h">00</span> : <span id = "m">00</span> : <span id = "s">00</span><span id = "ms"> .00</span>`;
  appendMS = document.getElementById("ms");
  appendSec = document.getElementById("s");
  appendMin = document.getElementById("m");
  appendHr = document.getElementById("h");
  clearInterval(interval);
}

function stopFun() {
  if (millsec < 10) {
    appendMS.innerHTML = ".0" + millsec;
  } else {
    appendMS.innerHTML = "." + millsec;
  }

  if (seconds < 10) {
    appendSec.innerHTML = "0" + seconds;
  } else {
    appendSec.innerHTML = seconds;
  }

  if (minutes < 10) {
    appendMin.innerHTML = "0" + minutes;
  } else {
    appendMin.innerHTML = minutes;
  }

  if (hours < 10) {
    appendHr.innerHTML = "0" + hours;
  } else {
    appendHr.innerHTML = hours;
  }
  clearInterval(interval);
}

/*********** stopwatch Ends ************/
