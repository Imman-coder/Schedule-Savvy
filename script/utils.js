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
    if (words[i] != "Prof.")
      firstLetters += words[i][0] || "";
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
  if (ln >= MAX_EVENTS) console.warn("MAX Event Exceded!");
  var id = ln + 1;

  return id;
}

function sortTimeList() {
  timeList.sort();
}


class snackbar {
  static System = "system";
  static Success = "success";
  static Warning = "warning";
  static Error = "error";
  static duration = 3000;

  static #svg = {
    'close-btn': `<svg xmlns="http://www.w3.org/2000/svg" class="t-close" width="16" height="16">
  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"></path>
</svg>`,

    'check-circle': `
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
      <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'/>
    </svg>
  `,

    'info-circle': `
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
    <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/>
  </svg>
`,

    'exclamation-circle': `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'/>
  </svg>
`,

    'exclamation-triangle': `
<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
  <path d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'/>
</svg>
`,
  };

  static show(content = "", type = "Toast",duration = this.duration) {
    // Get the snackbar DIV
    var snackbarContainer = document.getElementById("snackbar-container");

    // Create snackbar
    var snackbarDiv = document.createElement("div");
    var iconDiv = document.createElement("div");
    var textDiv = document.createElement("div");
    var closeBtn = document.createElement("div");

    snackbarDiv.className = "snackbar show";
    closeBtn.className = "close-btn";
    iconDiv.className = "icon";
    textDiv.className = "text";



    closeBtn.innerHTML = this.#svg['close-btn'];
    textDiv.innerHTML = content;
    snackbarDiv.setAttribute("type", type);

    switch (type) {
      case this.System:
        iconDiv.innerHTML = this.#svg['info-circle'];
        break;

      case this.Warning:
        iconDiv.innerHTML = this.#svg['exclamation-triangle'];
        break;

      case this.Error:
        iconDiv.innerHTML = this.#svg['exclamation-circle'];
        break;

      case this.Success:
        iconDiv.innerHTML = this.#svg['check-circle'];
        break;

      default:
        break;
    }


    snackbarDiv.append(iconDiv);
    snackbarDiv.append(textDiv);
    snackbarDiv.append(closeBtn);

    snackbarContainer.append(snackbarDiv);

    const progressBar = getProgressBar(duration);
    progressBar && snackbarDiv.appendChild(progressBar);
    progressBar.onanimationend = ()=> removeToast();

    closeBtn.addEventListener("click", removeToast);





    function removeToast() {
      snackbarDiv.className = snackbarDiv.className.replace("snackbar show", "snackbar");
      setTimeout(function () { snackbarContainer.removeChild(snackbarDiv); }, 400);
    }


    function getProgressBar(duration) {
      if (duration === 0) return;

      const progressBar = document.createElement('div');
      progressBar.classList.add('t-progress-bar');
      duration && progressBar.style.setProperty('--toast-duration', `${duration}ms`);
      return progressBar;
    }
  }




}
