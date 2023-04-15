var copiedEvent;


function initListeners() {
  for (var i = 0; i < this.singleEvents.length; i++) {
    const e = singleEvents[i];
    e.addEventListener("dragstart", onEventDragListner);
    e.addEventListener("dragenter", onEventDragEnterListner);
    e.addEventListener("dragleave", onEventDragLeaveListner);
    e.addEventListener("dragover", onEventDragOverListner);
    e.addEventListener("drop", onEventDropListner);
    e.addEventListener("dblclick", onEventDoubbleClick);

    if (e.getAttribute("type") == "2") {
      e.addEventListener("click", function () {
        console.log("ee");
      });
      e.addEventListener("contextmenu", onAdderRightClick);
    }
    else {
      e.addEventListener("contextmenu", onEventRightClick);
      e.addEventListener("click", function () {
        if (!(active[0] == activeprev[0] && active[1] == activeprev[1])) {
          activeprev = [active[0], active[1]];
          active = [e.getAttribute('x'), e.getAttribute('y')];
          drawTable();
        }
      });
    }
  }
}

function onEventRightClick(event) {
  event.preventDefault();

  showMenuItems(
    Cut = true,
    Copy = true,
    PasteAfter = true,
    PasteBefore = true,
    Delete = true,
    Preference = false,
    Paste = false,
  );
  enableMenuItems(
    Cut = true,
    Copy = true,
    PasteAfter = typeof copiedEvent != "undefined",
    PasteBefore = typeof copiedEvent != "undefined",
    Delete = true,
    Preference = true,
    Paste = false,
  );

  showContextMenu(event);
}


function onAdderRightClick(event) {
  event.preventDefault();

  showMenuItems(
    Cut = false,
    Copy = false,
    PasteAfter = false,
    PasteBefore = false,
    Delete = false,
    Preference = false,
    Paste = true,
  );
  enableMenuItems(
    Cut = true,
    Copy = true,
    PasteAfter = false,
    PasteBefore = false,
    Delete = true,
    Preference = true,
    Paste = typeof copiedEvent != "undefined",
  );

  showContextMenu(event);
}



function onEventDoubbleClick(event) {
  event.preventDefault();
  active = [activeprev[0], activeprev[1]];
  activeprev = [-1, -1];
  console.log(active, activeprev);
  drawTable();
  console.log("double clicked!")
}

function onEventDragListner(event) {

  const e = event.target;
  event.dataTransfer.setData("data", [e.getAttribute('x'), e.getAttribute('y')]);
}

function onEventDragEnterListner(event) {
  event.target.classList.add("caret");
}

function onEventDragLeaveListner(event) {
  event.target.classList.remove("caret");
}
function onEventDragOverListner(event) {
  event.preventDefault();
}
function onEventDropListner(event) {
  event.preventDefault();
  event.target.classList.remove("caret");

  const sx = event.dataTransfer.getData("data")[0],
    sy = event.dataTransfer.getData("data")[2],
    rx = event.target.getAttribute("x"),
    ry = event.target.getAttribute("y");

  var delItem;
  if (event.ctrlKey)
    delItem = subList[sx][sy];
  else
    delItem = subList[sx].splice(sy, 1)[0];

  subList[rx].splice(ry, 0, delItem);
  drawTable();
}

// function addNewEventListener(event){
//   const rx=event.target.getAttribute("x"),
//   ry=event.target.getAttribute("y");

// }

var item = document.getElementById("time-divider");

window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) item.scrollLeft += 10;
  else item.scrollLeft -= 10;
  placeEvents();
});
