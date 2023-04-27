/*-------------------Menu Defines------------------------*/
const popupMenu = document.getElementById("modal-box");
const popupMenuBody = popupMenu.getElementsByClassName("box-content")[0];
var popupMenuOkBtn = document.getElementById("modal-ok-btn");
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
    onOkBtnClick() {
        console.error("Abstract Method has no implementation");
    }
    onPopupMenuClose() {
        console.error("Abstract Method has no implementation");
    }
    onPopupMenuOpen() {
        if (this._type == 0) {
            popupMenuOkBtn.innerHTML = "Yes";
            popupMenuCancelBtn.innerHTML = "No";
        }
        else if (this._type == 1) {
            popupMenuOkBtn.innerHTML = "Ok";
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

function enablePopupOkBtn(enable = false) {
    popupMenuOkBtn.replaceWith(popupMenuOkBtn.cloneNode(true));
    popupMenuOkBtn = document.getElementById("modal-ok-btn");
    if (enable) {
        popupMenuOkBtn.classList.remove("disable");
        popupMenuOkBtn.addEventListener("click", () => reserved_for.onOkBtnClick());
    } else {
        popupMenuOkBtn.classList.add("disable");
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
        return this.modalTextBox.value != '';
    }
    onOkBtnClick() {
        var l = timeToInt(formatTime(this.modalTextBox.value));
        if (!timeList.includes(l.toString()))
            addTimeLineStamp(l);
        else
            snackbar.show("Time already added!", snackbar.Error, 3000);
        closePopupMenu();
    }
    onPopupMenuClose() {
        popupMenuBody.innerHTML = "";
        this.modalTextBox.removeEventListener("change", () => {
            enablePopupOkBtn(this.isValid());
        });
        this.modalTextBox = null;
    }
    onPopupMenuOpen() {
        super.onPopupMenuOpen();
        popupMenuBody.innerHTML = this._content;
        this.modalTextBox = popupMenuBody.getElementsByClassName("time")[0];
        const ref = this;
        this.modalTextBox.addEventListener("change", () => {
            enablePopupOkBtn(this.isValid());
        });
        this.modalTextBox.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                if (this.isValid())
                    this.onOkBtnClick();
            }
        });
    } 
}



class LoadLastSessionModule extends popupMenuDisplayModule {
    constructor() {
        super();
        this._content = `<a>Do you want to load from cache? </a>`;
        this._type = 0;
        this._cancelable = false;
        this._table_cache;
        this._color_cache;

        this._mouseoverf = () => {
            this._table_cache = sJson;
            this._color_cache = colorTable;
            loadFromBrowser();
        };
        this._mouseleavef = () => {
            loadContentToTable(this._table_cache, this._color_cache);
        };
    }

    onPopupMenuOpen() {
        super.onPopupMenuOpen();
        popupMenuBody.innerHTML = this._content;
        enablePopupOkBtn(true);
        popupMenuOkBtn.addEventListener("mouseover", this._mouseoverf);
        popupMenuOkBtn.addEventListener("mouseleave", this._mouseleavef);

    }
    onOkBtnClick() {
        popupMenuOkBtn.removeEventListener("mouseover", this._mouseoverf);
        popupMenuOkBtn.removeEventListener("mouseleave", this._mouseleavef);

        var bar = snackbar.show("Loaded from previous session ! </br> Click to revert.");
        bar.onclick = ()=>{
            snackbar.show("Reverted!");
            this._mouseleavef();
            bar.hide();
        };
        closePopupMenu();
    }

    onPopupMenuClose() {
        popupMenuBody.innerHTML = "";

    }

}



/*------------------Module Specific functions------------------*/
function initTimeAdderModule() {
    reserved_for = new TimeAdderModule();
}
function initLoadLastModule() {
    reserved_for = new LoadLastSessionModule();
    openPopupMenu();
}
