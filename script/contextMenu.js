const contextMenu = document.getElementById("context-menu"),
    menuItemCut = document.getElementById("menuItemCut"),
    menuItemCopy = document.getElementById("menuItemCopy"),
    menuItemPasteBefore = document.getElementById("menuItemPasteBefore"),
    menuItemPasteAfter = document.getElementById("menuItemPasteAfter"),
    menuItemDelete = document.getElementById("menuItemDelete"),
    menuItemPreference = document.getElementById("menuItemPreference"),
    menuItemPaste = document.getElementById("menuAdderPaste");



function showContextMenu(event) {
    const contextMenu = document.getElementById("context-menu");

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
    copiedEvent = subList[contextMenu.getAttribute("x")][contextMenu.getAttribute("y")];
    subList[contextMenu.getAttribute("x")].splice(contextMenu.getAttribute("y"), 1);
    closeContextMenu();
    drawTable();
}

function onContextCopy() {
    copiedEvent = subList[contextMenu.getAttribute("x")][contextMenu.getAttribute("y")];
    closeContextMenu();
    drawTable();
}
function onContextPasteBefore() {
    const rx = parseInt(contextMenu.getAttribute("x")),
        ry = parseInt(contextMenu.getAttribute("y"));


    subList[rx].splice(ry, 0, copiedEvent);
    closeContextMenu();
    drawTable();
}
function onContextPasteAfter() {
    const rx = parseInt(contextMenu.getAttribute("x")),
        ry = parseInt(contextMenu.getAttribute("y"));


    subList[rx].splice(ry + 1, 0, copiedEvent);
    closeContextMenu();
    drawTable();
}
function onContextDelete() {
    var x = contextMenu.getAttribute("x"),
        y = contextMenu.getAttribute("y"),
        type = contextMenu.getAttribute("type");

    if (type == "event") {
        subList[x].splice(y, 1);
    }
    else if (type == "timeline") {
        timeList.splice(x, 1);
    }
    closeContextMenu();
    drawTable();
}
function onContextPreference() {
    console.log("Preference Menu");
    closeContextMenu();
}



/*--------------Hide/Show Menu Items-------------*/

function showMenuItem(item, e = true) {
    if (e)
        item.classList.remove("hide");
    else
        item.classList.add("hide");
}

function hideMenuHelper(item, e) {
    if (typeof item == "number") return;
    else showMenuItem(item, e);
}

function showMenuItems(Cut = 3, Copy = 3, PasteAfter = 3, PasteBefore = 3, Delete = 3, Preference = 3, Paste = 3) {
    hideMenuHelper(menuItemCut, Cut);
    hideMenuHelper(menuItemCopy, Copy);
    hideMenuHelper(menuItemPasteAfter, PasteAfter);
    hideMenuHelper(menuItemPasteBefore, PasteBefore);
    hideMenuHelper(menuItemDelete, Delete);
    hideMenuHelper(menuItemPreference, Preference);
    hideMenuHelper(menuItemPreference, Preference);
    hideMenuHelper(menuItemPaste, Paste);
}



/*------------Disable/Enable Menu Items---------------*/
function enableMenuItem(item, e = true) {
    if (e)
        item.classList.remove("disable");
    else
        item.classList.add("disable");
}

function enableMenuHelper(item, e) {
    if (typeof item == "number") return;
    else enableMenuItem(item, e);
}

function enableMenuItems(Cut = 3, Copy = 3, PasteAfter = 3, PasteBefore = 3, Delete = 3, Preference = 3, Paste = 3) {
    enableMenuHelper(menuItemCut, Cut);
    enableMenuHelper(menuItemCopy, Copy);
    enableMenuHelper(menuItemPasteAfter, PasteAfter);
    enableMenuHelper(menuItemPasteBefore, PasteBefore);
    enableMenuHelper(menuItemDelete, Delete);
    enableMenuHelper(menuItemPreference, Preference);
    enableMenuHelper(menuItemPaste, Paste);
}




/*-------------------Modal Box------------------------*/

const modal = document.getElementsByClassName("modal")[0];
const modalOkBtn = document.getElementById("modal-ok-btn");
const modalCancelBtn = document.getElementById("modal-cancel-btn");
const modalTextBox = document.getElementById("time-adder-text");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function okBtnClick() {
    addTimeLineStamp(formatTime(modalTextBox.value));
    modalTextBox.value = '';
    validateModalBox();
    toggleModal();
}

modalCancelBtn.addEventListener("click", toggleModal);


function validateModalBox() {
    if (modalTextBox.checkValidity()) {
        modalOkBtn.classList.remove("disable");
        modalOkBtn.addEventListener("click", okBtnClick);
    }
    else {
        modalOkBtn.classList.add("disable");
        modalOkBtn.removeEventListener("click");
    }
}

modalTextBox.addEventListener("change", () => {
    validateModalBox();
})

