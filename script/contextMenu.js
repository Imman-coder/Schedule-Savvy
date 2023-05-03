const contextMenu = document.getElementById("context-menu"),
    contextItemCut = 0,
    contextItemCopy = 1,
    contextItemPasteBefore = 2,
    contextItemPasteAfter = 3,
    contextItemPaste = 4,
    contextItemDelete = 5,
    contextItemPreference = 6,
    contextItemAddTimeline = 7;
injectContextMenu();

const contextMenuItems = contextMenu.getElementsByClassName("item");

contextMenu.x = () => contextMenu.getAttribute("x");
contextMenu.y = () => contextMenu.getAttribute("Y");





function closeContextMenu() {
    contextMenu.removeAttribute("x");
    contextMenu.removeAttribute("y");
    contextMenu.classList.remove("visible");
}


document.body.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});


document.body.addEventListener("click", (e) => {
    if (e.target.offsetParent != contextMenu) {
        closeContextMenu();
    }
});



/*----------Menu Item Click Handler-----------*/
function onContextCut() {
    Table.cutEvent(contextMenu.x(), contextMenu.y());
    closeContextMenu();
}

function onContextCopy() {
    Table.copyEvent(contextMenu.x(), contextMenu.y());
    closeContextMenu();
}
function onContextPasteBefore(ref) {
    if (!ref.classList.contains("disable")) {
        Table.putEvent(contextMenu.x(), contextMenu.y());
        closeContextMenu();
    }
}
function onContextPasteAfter(ref) {
    if (!ref.classList.contains("disable")) {
        Table.putEventAfter(contextMenu.x(), contextMenu.y());
        closeContextMenu();
    }
}
function onContextDelete(ref) {
    if (!ref.classList.contains("disable")) {
        if(contextMenu.getAttribute("type")=="event")
            Table.deleteEvent(contextMenu.x(), contextMenu.y());
        if(contextMenu.getAttribute("type")=="timeline")
            Table.deleteTimeLineStamp(contextMenu.x());
        closeContextMenu();
    }
}
function onContextPreference() {
    console.log("Preference Menu");
    closeContextMenu();
}

function onContextAddTimeline() {
    initTimeAdderModule();
    openPopupMenu();
}



/*--------------Hide/Show Menu Items-------------*/

function showMenuItem(item) {
    item.classList.remove("hide");
}
function hideAllMenuItems() {
    for (let index = 0; index < contextMenuItems.length; index++) {
        contextMenuItems[index].classList.add("hide");
    }
}


/*------------Disable/Enable Menu Items---------------*/
function enableMenuItem(item) {
    item.classList.remove("disable");
}

function disableAllMenuItem() {
    for (let index = 0; index < contextMenuItems.length; index++) {
        contextMenuItems[index].classList.add("disable");
    }
}


/*-------------------Show Context Menu-------------------*/
function showContextMenu(event, type, showOptions, enableOptions) {
    hideAllMenuItems();
    disableAllMenuItem();
    contextMenu.setAttribute("type", type);
    for (let index = 0; index < showOptions.length; index++) {
        const element = showOptions[index];
        showMenuItem(contextMenuItems[element]);
    }
    for (let index = 0; index < enableOptions.length; index++) {
        const element = enableOptions[index];
        enableMenuItem(contextMenuItems[element]);
    }

    const { clientX: mouseX, clientY: mouseY } = event;

    const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

    contextMenu.classList.remove("visible");

    contextMenu.style.top = `${normalizedY}px`;
    contextMenu.style.left = `${normalizedX}px`;

    const rx = event.target.getAttribute("x"),
        ry = event.target.getAttribute("y");

    contextMenu.setAttribute("x", rx);
    contextMenu.setAttribute("y", ry);

    setTimeout(() => {
        contextMenu.classList.add("visible");
    });
}




/*--------------Context Menu Injector----------------------*/

function injectContextMenu() {
    contextMenu.innerHTML = `
    <div onclick="onContextCut(this)" class="item">Cut</div>
    <div onclick="onContextCopy(this)" class="item">Copy</div>
    <div
      onclick="onContextPasteBefore(this)"
      class="item"
    >
      Paste Before
    </div>
    <div onclick="onContextPasteAfter(this)" class="item">
      Paste After
    </div>
    <div onclick="onContextPasteBefore(this)" class="item">
      Paste
    </div>
    <div onclick="onContextDelete(this)" class="item red">
      Delete
    </div>
    <div
      onclick="onContextPreference(this)"
      class="item disable"
    >
      Preferences
    </div>
    <div onclick="onContextAddTimeline(this)" class="item">
      Add Timeline
    </div>`;
}











