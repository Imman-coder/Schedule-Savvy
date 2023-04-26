const MAX_EVENTS = 50;

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



window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) time_divider_group.scrollLeft += 10;
  else time_divider_group.scrollLeft -= 10;
  placeEvents();
});



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


function getFirstLetters(name) {
  let words = name.split(" ");
  let firstLetters = "";
  for (let i = 0; i < words.length; i++) {
    if(words[i] != "Prof.")
      firstLetters += words[i][0]||"";
  }
  return firstLetters;
}


/*---------------------Color Palette-----------------------------*/


// helper function to calculate color difference
function colorDiff(color1, color2) {
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}

function generateColorPalette() {
  colorTable = [];

  for (let i = 0; i < MAX_EVENTS; i++) {
      let color = '';
      let bgDiff = 0;
      let textDiff = 0;

      // keep generating colors until one that complements the background and text is found
      while (bgDiff < 150 || textDiff < 150) {
          // generate a random color in hex format
          color = '#' + Math.floor(Math.random() * 16777215).toString(16);

          // check if the color complements the background and text colors
          bgDiff = colorDiff(color, backgroundColor);
          textDiff = colorDiff(color, textColor);
      }

      // add the color to the array
      colorTable.push(color);
  }
  drawTable();
}


/*---------------------------Associate Id Generater------------------------------*/

function getNewEventId() {
  var ln = Object.keys(test_subs).length
  if(ln>=MAX_EVENTS) console.warn("MAX Event Exceded!");
  var id = ln+1;

  return id;
}

function sortTimeList() {
  timeList.sort();
}

