/*-------------------Menu Defines------------------------*/
const popupMenu = document.getElementById("modal-box");
const popupMenuBody = popupMenu.getElementsByClassName("box-content")[0];
const popuMenuOkBtn = document.getElementById("modal-ok-btn");
const popupMenuCancelBtn = document.getElementById("modal-cancel-btn");
var reserved_for;

/*------------------Popup Display Module-----------------*/
class popupMenuDisplayModule {
    constructor() {
        if (this.constructor == popupMenuDisplayModule) {
            console.error(" Object of Abstract Class cannot be created");
        }
        this._content;
        this._cancelable = false;
        /**
         * 0->Yes/No,
         * 1->Ok/Cancel
         */
        this._type = 1;
    }
    injectContent() {
        console.error("Abstract Method has no implementation");
    }
    onOkBtnClick() {
        console.error("Abstract Method has no implementation");
    }
    onPopupMenuClose() {
        console.error("Abstract Method has no implementation");
    }
    onPopupMenuOpen() {
        if (this._type == 0) {
            popuMenuOkBtn.innerHTML = "Yes";
            popupMenuCancelBtn.innerHTML = "No";
        }
        else if (this._type == 1) {
            popuMenuOkBtn.innerHTML = "Ok";
            popupMenuCancelBtn.innerHTML = "Cancel";
        }
    }
}

/*---------------------------Popup Menu Functions---------------------------*/
function closePopupMenu() {
    if (reserved_for != undefined) reserved_for.onPopupMenuClose();
    popupMenu.classList.remove("show-popupMenu");
}

function openPopupMenu() {
    if (reserved_for != undefined) reserved_for.onPopupMenuOpen();
    popupMenu.classList.add("show-popupMenu");
}

function popupMenuOkBtn(enable = false) {
    if (enable) {
        popuMenuOkBtn.classList.remove("disable");
        popuMenuOkBtn.addEventListener("click", () => reserved_for.onOkBtnClick());
    } else {
        popuMenuOkBtn.classList.add("disable");
        popuMenuOkBtn.removeEventListener("click", () => reserved_for.onOkBtnClick());
    }
}

/*---------------------Handler functions---------------------*/
popupMenuCancelBtn.addEventListener("click", closePopupMenu);

popupMenu.addEventListener("click", (event) => {
    if (event.target == popupMenu && reserved_for._cancelable) closePopupMenu();
});

/*-------------------Module Specific Class Declerations-------------------*/
class TimeAdderModule extends popupMenuDisplayModule {
    constructor() {
        super();
        this._content = `
        <a>Add Time </a>
        <input class="time" type="time" autofocus />`;

        this.modalTextBox;
        this._cancelable = true;
        this._type = 1;
    }
    isValid() {
        return this.modalTextBox.checkValidity();
    }
    onOkBtnClick() {
        var l = timeToInt(formatTime(this.modalTextBox.value));
        if(!timeList.includes(l.toString()))
            addTimeLineStamp(l);
        else
            snackbar.show("Time already added!",snackbar.Error,3000);
        closePopupMenu();
    }
    onPopupMenuClose() {
        popupMenuBody.innerHTML = "";
        this.modalTextBox.removeEventListener("change", () => {
            popupMenuOkBtn(this.isValid());
        });
        this.modalTextBox = null;
    }
    onPopupMenuOpen() {
        super.onPopupMenuOpen();
        popupMenuBody.innerHTML = this._content;
        this.modalTextBox = popupMenuBody.getElementsByClassName("time")[0];
        this.modalTextBox.addEventListener("change", () => {
            popupMenuOkBtn(this.isValid());
        });
    }
}

class LoadLastSessionModule extends popupMenuDisplayModule {
    constructor() {
        super();
        this._content = ``;
        this._type = 0;
        this._cancelable = false;
    }

}



/*------------------Module Specific functions------------------*/
function initTimeAdderModule() {
    reserved_for = new TimeAdderModule();
}
