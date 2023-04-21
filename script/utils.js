

const normalizePozition = (mouseX, mouseY) => {
  // ? compute what is the mouse position relative to the container element (scope)
  let {
    left: scopeOffsetX,
    top: scopeOffsetY,
  } = document.body.getBoundingClientRect();

  scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
  scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

  const scopeX = mouseX - scopeOffsetX;
  const scopeY = mouseY - scopeOffsetY;

  // ? check if the element will go out of bounds
  const outOfBoundsOnX =
    scopeX + contextMenu.clientWidth > document.body.clientWidth;

  const outOfBoundsOnY =
    scopeY + contextMenu.clientHeight > document.body.clientHeight;

  let normalizedX = mouseX;
  let normalizedY = mouseY;

  // ? normalize on X
  if (outOfBoundsOnX) {
    normalizedX =
      scopeOffsetX + document.body.clientWidth - contextMenu.clientWidth;
  }

  // ? normalize on Y
  if (outOfBoundsOnY) {
    normalizedY =
      scopeOffsetY + document.body.clientHeight - contextMenu.clientHeight;
  }

  return { normalizedX, normalizedY };
};



/*--------------------Time Related Calculations---------------------*/

function formatTime(timeString) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  const s = (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  return (s.length == 6) ? "0" + s : s;
}


function timeToInt(timeString) {
  var timeArr = timeString.match(/^(\d{1,2}):(\d{2})([ap]m)$/i); // split time string into hours, minutes and meridiem
  var hours = parseInt(timeArr[1]); // extract hours as integer
  var minutes = parseInt(timeArr[2]); // extract minutes as integer
  var meridiem = timeArr[3].toLowerCase(); // extract meridiem as lowercase string

  if (meridiem === 'pm' && hours !== 12) {
    hours += 12; // convert hours to 24-hour format if it's in the afternoon
  } else if (meridiem === 'am' && hours === 12) {
    hours = 0; // convert 12 AM to 0 hours
  }
  
  return (hours * 60) + minutes; // convert hours and minutes to minutes
}


function intToTime(minutes) {
  var hours = Math.floor(minutes / 60);
  var minutes = minutes % 60;

  if (hours == 0) {
    return "12:" + padZero(minutes) + "AM";
  } else if (hours < 12) {
    return hours + ":" + padZero(minutes) + "AM";
  } else if (hours == 12) {
    return "12:" + padZero(minutes) + "PM";
  } else {
    return (hours - 12) + ":" + padZero(minutes) + "PM";
  }
}

function padZero(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

function test(){
  timeList.map(x=>{console.log(timeToInt(x));});
}


function getFirstLetters(name) {
  let words = name.split(" ");
  let firstLetters = "";
  for (let i = 0; i < words.length; i++) {
    if(words[i] != "Prof.")
      firstLetters += words[i][0];
  }
  return firstLetters;
}