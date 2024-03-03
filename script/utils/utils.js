const MAX_EVENTS = 50;
const SHOW_DEBUG_MESSAGES = true;

const backgroundColor = "#1a1a1a";
const textColor = "#e8e8e8";

/**
 * The function normalizes the position of a mouse click relative to a container element and ensures
 * that the element does not go out of bounds.
 * @param mouseX - The horizontal position of the mouse cursor on the screen.
 * @param mouseY - The Y coordinate of the mouse pointer on the screen.
 * @returns An object with the normalized X and Y coordinates of the mouse position relative to the
 * container element (scope), taking into account if the context menu element will go out of bounds on
 * the X or Y axis and normalizing accordingly.
 */
const normalizePozition = (mouseX, mouseY) => {
  // ? compute what is the mouse position relative to the container element (scope)
  let { left: scopeOffsetX, top: scopeOffsetY } =
    document.body.getBoundingClientRect();

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
  Table.AdjustPlacement();
});

/*--------------------Time Related Calculations---------------------*/
/**
 * The function formats a time string in 12-hour format with AM/PM indicator.
 * @param timeString - The input time string in the format "HH:MM", where HH represents the hour in
 * 24-hour format and MM represents the minute.
 * @returns The function `formatTime` returns a formatted time string in the format "hh:mmAM/PM".
 */

function formatTime(timeString) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  const s = (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  return s.length == 6 ? "0" + s : s;
}

/**
 * The function converts a time string in 12-hour format to an integer representing the number of
 * minutes since midnight.
 * @param timeString - A string representing a time in 12-hour format, e.g. "3:30pm" or "11:45am".
 * @returns an integer value representing the input time string in minutes, converted to 24-hour
 * format.
 */
function timeToInt(timeString) {
  var timeArr = timeString.match(/^(\d{1,2}):(\d{2})([ap]m)$/i); // split time string into hours, minutes and meridiem
  var hours = parseInt(timeArr[1]); // extract hours as integer
  var minutes = parseInt(timeArr[2]); // extract minutes as integer
  var meridiem = timeArr[3].toLowerCase(); // extract meridiem as lowercase string

  if (meridiem === "pm" && hours !== 12) {
    hours += 12; // convert hours to 24-hour format if it's in the afternoon
  } else if (meridiem === "am" && hours === 12) {
    hours = 0; // convert 12 AM to 0 hours
  }

  return hours * 60 + minutes; // convert hours and minutes to minutes
}

/**
 * The function converts an integer representing minutes into a string in the format of hours and
 * minutes with AM or PM.
 * @param minutes - The number of minutes to be converted into a time format (hours and minutes with
 * AM/PM).
 * @returns The function `intToTime` returns a string representing the time in 12-hour format, given
 * the input `minutes` as an integer. The string includes the hours, minutes, and AM/PM indicator.
 */
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
    return hours - 12 + ":" + padZero(minutes) + "PM";
  }
}

function padZero(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

/**
 * The function takes a name as input and returns the first letters of each word in the name, excluding
 * "Prof." if present.
 * @param name - The input parameter is a string representing a person's name.
 * @returns a string that contains the first letter of each word in the input string `name`.
 */
function getFirstLetters(name) {
  let words = name.split(" ");
  let firstLetters = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i] != "Prof.") firstLetters += words[i][0] || "";
  }
  return firstLetters;
}

function simplifySubjectName(name){
  let acr = name.substring(name.indexOf("(")+1,name.indexOf(")"))
  if(acr !== "") return acr
  if(name.length < 5) return name
  let words = name.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (!words[i].includes("(")) acr += words[i][0] 
  }
  return acr
}

function simplifyTeacherName(name){
  let acr = name.substring(name.indexOf("(")+1,name.indexOf(")"))
  if(acr !== "") return acr
  if(name.length < 5) return name
  let words = name.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (!words[i].toLowerCase().includes("prof")) acr += words[i][0] || "";
  }
  return acr
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
  return Math.sqrt(
    Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
  );
}

/**
 * The function generates a color palette by randomly generating colors and checking if they complement
 * the background and text colors.
 */
function generateColorPalette() {
  const backgroundColor = getComputedStyle(document.body).getPropertyValue(
    "--primary-container"
  );

  const textColor = getComputedStyle(document.body).getPropertyValue(
    "--on-pimary"
  );

  const opacity = getComputedStyle(document.body)
    .getPropertyValue("--opacity")
    .trim();

  colorTable = [];

  for (let i = 0; i < MAX_EVENTS; i++) {
    let color = "";
    let bgDiff = 0;
    let textDiff = 0;

    // keep generating colors until one that complements the background and text is found
    while (bgDiff < 150 || textDiff < 150) {
      // generate a random color in hex format
      color = "#" + Math.floor(Math.random() * 16777215).toString(16) + opacity;

      // check if the color complements the background and text colors
      bgDiff = colorDiff(color, backgroundColor);
      textDiff = colorDiff(color, textColor);
    }

    // add the color to the array

    colorTable.push(color);
  }
  Table.Draw();
}

/*---------------------------Associate Id Generater------------------------------*/

/**
 * The function returns a new event ID that is not already in use by checking a list of existing IDs.
 * @returns a new event ID that is not already present in the `subList` array.
 */
function getNewEventId() {
  for (let id = 1; id < MAX_EVENTS; id++) {
    let keys = Object.keys(Table.Data.EventList)
    var has = false
    console.log(keys);
    for (let i = 0; i < keys.length; i++) {
      if(keys[i]==id){
        has = true
        break
      }
    }
    if(!has) return id
  }
  console.warn("MAX Event Exceded!");
}

/**
 * The function sorts a list of time values in ascending order.
 */
function sortTimeList() {
  timeList.sort();
}

/* The snackbar class is a JavaScript class that creates and displays a customizable notification
message with different types and durations. */
class snackbar {
  static System = "system";
  static Success = "success";
  static Warning = "warning";
  static Error = "error";
  static duration = 3000;

  static #svg = {
    "close-btn": `<svg xmlns="http://www.w3.org/2000/svg" class="t-close" width="16" height="16">
  <path class="cb" d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"></path>
</svg>`,

    "check-circle": `
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
      <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'/>
    </svg>
  `,

    "info-circle": `
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
    <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/>
  </svg>
`,

    "exclamation-circle": `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'/>
  </svg>
`,

    "exclamation-triangle": `
<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
  <path d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'/>
</svg>
`,
  };

  static show(content = "", type = snackbar.System, duration = this.duration) {
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

    closeBtn.innerHTML = this.#svg["close-btn"];
    textDiv.innerHTML = content;
    snackbarDiv.setAttribute("type", type);

    switch (type) {
      case this.System:
        iconDiv.innerHTML = this.#svg["info-circle"];
        break;

      case this.Warning:
        iconDiv.innerHTML = this.#svg["exclamation-triangle"];
        break;

      case this.Error:
        iconDiv.innerHTML = this.#svg["exclamation-circle"];
        break;

      case this.Success:
        iconDiv.innerHTML = this.#svg["check-circle"];
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
    progressBar.onanimationend = () => removeToast();

    snackbarDiv.hide = () => removeToast();

    closeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      removeToast();
    });

    function getProgressBar(duration) {
      if (duration === 0) return;

      const progressBar = document.createElement("div");
      progressBar.classList.add("t-progress-bar");
      duration &&
        progressBar.style.setProperty("--toast-duration", `${duration}ms`);
      return progressBar;
    }

    function removeToast() {
      snackbarDiv.className = snackbarDiv.className.replace(
        "snackbar show",
        "snackbar"
      );
      setTimeout(() => {
        snackbarContainer.removeChild(snackbarDiv);
      }, 400);
    }
    return snackbarDiv;
  }
}

document.onkeydown = function (e) {
  if (!e.repeat) {
    if (document.activeElement.localName != "input") {
      if (e.ctrlKey && e.key === "c") {
        Table.copyEvent();
        return false;
      } else if (e.ctrlKey && e.key === "v") {
        Table.putEvent();
        return false;
      } else if (e.key === "Delete") {
        Table.deleteEvent();
        return false;
      } else if (e.ctrlKey && e.key === "x") {
        Table.cutEvent();
        return false;
      } else if (e.ctrlKey && e.key === "z") {
        UndoManager.undo();
        return false;
      } else if (e.ctrlKey && e.shiftKey && e.key === "Z") {
        UndoManager.redo();
        return false;
      }
    } else if (e.ctrlKey && e.key === "s") {
      Db.saveToBrowser();
      return false;
    } else if (e.ctrlKey && e.key === "p") {
      generateColorPalette();
      return false;
    } else if (e.ctrlKey && e.key === "m") {
      Table.newTable();
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  }
};

/* The function returns the width of the string in pixels when rendered with the specified font. */
String.prototype.width = function (font = "12px arial") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(this);
  return metrics.width;
};

/**
 * The function returns the current date and time in a specific format.
 * @returns The function `getCurrentTimeDate()` returns a string that represents the current date and
 * time in the format "YYYY-MM-DD HH:MM:SS".
 */
function getCurrentTimeDate() {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
}

class UndoManager {
  static undoStack = [];
  static redoStack = [];

  static recordUndoState(object, key, desc) {
    const currentState = {
      name: object,
      key: key,
      value: JSON.parse(JSON.stringify(object[key])),
      desc: desc,
    };
    this.undoStack = this.undoStack.slice(
      Math.max(this.undoStack.length - Preferences.undoStep + 1, 0)
    );
    this.undoStack.push(currentState);
    this.redoStack = [];
  }

  static undo() {
    const lastState = this.undoStack.pop();
    if (lastState) {
      const currentState = {
        name: lastState.name,
        key: lastState.key,
        value: JSON.parse(JSON.stringify(lastState.name[lastState.key])),
      };
      this.redoStack.push(currentState);
      lastState.name[lastState.key] = lastState.value;
      Table.InterceptorFunction("", lastState.key, "Undo", "");
    } else {
      snackbar.show("Nothing to Undo", snackbar.Warning);
    }
  }

  static redo() {
    const lastState = this.redoStack.pop();
    if (lastState) {
      const currentState = {
        name: lastState.name,
        key: lastState.key,
        value: JSON.parse(JSON.stringify(lastState.name[lastState.key])),
      };
      this.undoStack.push(currentState);
      lastState.name[lastState.key] = lastState.value;
      Table.InterceptorFunction("", lastState.key, "Redo", "");
    } else {
      snackbar.show("Nothing to Redo", snackbar.Warning);
    }
  }
}

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//         .register('./sw.js')
//         .then(() => { if (SHOW_DEBUG_MESSAGES) console.log('Service Worker Registered'); });
// }

let deferredPrompt;
const addBtn = document.querySelector(".install");

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "grid";

  addBtn.addEventListener("click", () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      //   if (choiceResult.outcome === 'accepted') {
      //     console.log('User accepted the A2HS prompt');
      //   } else {
      //     console.log('User dismissed the A2HS prompt');
      //   }
      deferredPrompt = null;
    });
  });
});
