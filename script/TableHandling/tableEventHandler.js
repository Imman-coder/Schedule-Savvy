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

    if (e.getAttribute("type") == "-1") {
      e.addEventListener("click", addNewEventListener);
      e.addEventListener("contextmenu", onAdderRightClick);
    } else {
      e.addEventListener("contextmenu", onEventRightClick);
      e.addEventListener("click", () =>
        Table.Data.active = [e.getAttribute("x"), e.getAttribute("y")]
      );
    }
  }

  for (let index = 0; index < timeLineItems.length; index++) {
    const e = timeLineItems[index];
    e.addEventListener("contextmenu", onTimelineRightClick);
  }
}

function onTimelineRightClick(event) {
  event.preventDefault();
  showContextMenu(
    event,
    "timeline",
    [contextItemDelete, contextItemAddTimeline],
    [contextItemDelete, contextItemAddTimeline]
  );
}

function onEventRightClick(event) {
  event.preventDefault();
  if (Table.Data.copiedEvent != undefined)
    showContextMenu(
      event,
      "event",
      [
        contextItemCut,
        contextItemCopy,
        contextItemPasteAfter,
        contextItemPasteBefore,
        contextItemDelete,
      ],
      [
        contextItemCut,
        contextItemCopy,
        contextItemPasteAfter,
        contextItemPasteBefore,
        contextItemDelete,
      ]
    );
  else
    showContextMenu(
      event,
      "event",
      [
        contextItemCut,
        contextItemCopy,
        contextItemPasteAfter,
        contextItemPasteBefore,
        contextItemDelete,
      ],
      [contextItemCut, contextItemCopy, contextItemDelete]
    );
}

function onAdderRightClick(event) {
  event.preventDefault();

  if (typeof Table.Data.copiedEvent != "undefined")
    showContextMenu(
      event,
      "event-adder",
      [contextItemPaste],
      [contextItemPaste]
    );
  else showContextMenu(event, "event-adder", [contextItemPaste], []);
}

function onEventDoubbleClick(event) {
  event.preventDefault();
  active = [activeprev[0], activeprev[1]];
  activeprev = [-1, -1];
  console.log(active, activeprev);
  Table.Draw();
  console.log("double clicked!");
}

function onEventDragListner(event) {
  const e = event.target;
  event.dataTransfer.setData("data", [
    e.getAttribute("x"),
    e.getAttribute("y"),
  ]);
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

  const
    sx = event.dataTransfer.getData("data")[0],
    sy = event.dataTransfer.getData("data")[2],
    rx = event.target.getAttribute("x"),
    ry = event.target.getAttribute("y");

  if (event.ctrlKey) Table.putEvent(rx, ry, Table.getEventID(sx, sy));
  else Table.moveEvent(sx, sy, rx, ry);
}

function addNewEventListener(event) {
  const rx = event.target.getAttribute("x"),
    ry = event.target.getAttribute("y");
  Table.addNewBlankEvent(rx, ry);
}

