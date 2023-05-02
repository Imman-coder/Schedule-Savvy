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
      e.addEventListener("click", function () {
        active = [e.getAttribute("x"), e.getAttribute("y")];
        onEventSelect();
        Table.Draw();
      });
    }
  }

  for (let index = 0; index < timeLineItems.length; index++) {
    const e = timeLineItems[index];
    e.addEventListener("contextmenu", onTimelineRightClick);
  }
}

function onTimelineRightClick(event) {
  event.preventDefault();
  showContextMenu(event, "timeline", [contextItemDelete, contextItemAddTimeline], [contextItemDelete, contextItemAddTimeline]);
}

function onEventRightClick(event) {
  event.preventDefault();
  if (typeof copiedEvent != "undefined")
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
  
  if (typeof copiedEvent != "undefined")
    showContextMenu(event, "event-adder", [contextItemPaste], [contextItemPaste]);
  else
    showContextMenu(event, "event-adder", [contextItemPaste], []);
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

  const sx = event.dataTransfer.getData("data")[0],
    sy = event.dataTransfer.getData("data")[2],
    rx = event.target.getAttribute("x"),
    ry = event.target.getAttribute("y");

  var delItem= Table.table[sx][sy];
  if (!event.ctrlKey){
    // delItem = Table.table[sx].splice(sy, 1)[0];
    Table.table[sx]=Table.table[sx].slice(0,sy).concat( Table.table[sx].slice(sy+1));

  }

  Table.table[rx].splice(ry, 0, delItem);
  // Table.Draw();
}

function addNewEventListener(event) {
  const rx = event.target.getAttribute("x"),
    ry = event.target.getAttribute("y"),
    id = getNewEventId();

  test_subs[id.toString()] = JSON.parse(JSON.stringify(EventBlock));

  Table.table[rx].push(id);
  active = [rx, ry];
  Table.Draw();
  onEventSelect();
}

var time_divider_group = document.getElementById("time-divider");
