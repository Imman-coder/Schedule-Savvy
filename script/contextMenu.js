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

const menuItemCut = document.getElementById("menuItemCut"),
    menuItemCopy = document.getElementById("menuItemCopy"),
    menuItemPasteBefore = document.getElementById("menuItemPasteBefore"),
    menuItemPasteAfter = document.getElementById("menuItemPasteAfter"),
    menuItemDelete = document.getElementById("menuItemDelete"),
    menuItemPreference = document.getElementById("menuItemPreference"),
    menuItemPaste = document.getElementById("menuAdderPaste");

const contextMenuItems = contextMenu.getElementsByClassName("item");





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

function showMenuItem(item) {
        item.classList.remove("hide");
}
function hideAllMenuItems(){
    for (let index = 0; index < contextMenuItems.length; index++) {
        contextMenuItems[index].classList.add("hide");
    }
}


/*------------Disable/Enable Menu Items---------------*/
function enableMenuItem(item) {
    item.classList.remove("disable");
}

function disableAllMenuItem(){
    for (let index = 0; index < contextMenuItems.length; index++) {
        contextMenuItems[index].classList.add("disable");
    }
}


/*-------------------Show Context Menu-------------------*/
function showContextMenu(event,type,showOptions,enableOptions){
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

function injectContextMenu(){
    contextMenu.innerHTML=`
    <div id="menuItemCut" onclick="onContextCut()" class="item">Cut</div>
    <div id="menuItemCopy" onclick="onContextCopy()" class="item">Copy</div>
    <div
      id="menuItemPasteBefore"
      onclick="onContextPasteBefore()"
      class="item"
    >
      Paste Before
    </div>
    <div id="menuItemPasteAfter" onclick="onContextPasteAfter()" class="item">
      Paste After
    </div>
    <div id="menuAdderPaste" onclick="onContextPasteBefore()" class="item">
      Paste
    </div>
    <div id="menuItemDelete" onclick="onContextDelete()" class="item red">
      Delete
    </div>
    <div
      id="menuItemPreference"
      onclick="onContextPreference()"
      class="item disable"
    >
      Preferences
    </div>`;
}

function contextMenuHookInjector(){
    
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
    addTimeLineStamp(timeToInt( formatTime(modalTextBox.value)));
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