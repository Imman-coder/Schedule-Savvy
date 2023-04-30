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
         * -1->No buttons
         * 0->Yes/No,
         * 1->Ok/Cancel
         */
        this._button_type = 1;
        enablePopupOkBtn(false);
    }
    onOkBtnClick() {
        console.trace("Abstract Method has no implementation");
    }
    onPopupMenuClose() {
        console.trace("Abstract Method has no implementation");
    }
    onPopupMenuOpen() {
        if (typeof this._button_type == 'object') {
            popupMenuOkBtn.innerHTML = this._button_type[1];
            popupMenuCancelBtn.innerHTML = this._button_type[0];
        }
        else if (this._button_type == 0) {
            popupMenuOkBtn.innerHTML = "Yes";
            popupMenuCancelBtn.innerHTML = "No";
        } else if (this._button_type == 1) {
            popupMenuOkBtn.innerHTML = "Ok";
            popupMenuCancelBtn.innerHTML = "Cancel";
        }
        else {

            popupMenuOkBtn.style.display = 'none';
            popupMenuCancelBtn.style.display = 'none';
        }
    }
    onPopupRequestLeave() {
        console.trace("Abstract Method has no implementation");
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
    if (event.target == popupMenu) {

        if (reserved_for.onPopupRequestLeave(event) && reserved_for._cancelable) closePopupMenu();
    }
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
        this._button_type = 1;
    }
    isValid() {
        return this.modalTextBox.value != "";
    }
    onOkBtnClick() {
        var l = timeToInt(formatTime(this.modalTextBox.value));
        if (!timeList.includes(l.toString())) addTimeLineStamp(l);
        else snackbar.show("Time already added!", snackbar.Error, 3000);
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
                if (this.isValid()) this.onOkBtnClick();
            }
        });
    }
}

class LoadLastSessionModule extends popupMenuDisplayModule {
    constructor() {
        super();
        this._content = `<a>Do you want to load from cache? </a>`;
        this._button_type = 0;
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

        var bar = snackbar.show(
            "Loaded from previous session ! </br> Click to revert."
        );
        bar.onclick = () => {
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



class saveAsImage extends popupMenuDisplayModule {
    constructor() {
        super();
        this._content = `
    <div class="left">
      <table>
        <tr>
          <td><span>Title : </span></td>
          <td><input type="text" name="Title" id="title" /></td>
        </tr>
        <tr>
          <td><span>Filename : </span></td>
          <td><input type="text" name="Fiename" id="filename" /></td>
        </tr>
        <tr>
          <td><span>Show Title : </span></td>
          <td><input type="checkbox" name="ShowTitle" id="showTitle" /></td>
        </tr>
      </table>
    </div>
    <div class="divider"></div>
    <div class="right">
    <span>Preview:</span>
      <div class="i">
        <div class="block-img">
          <span>Click to Enlarge</span>
        </div>
        <img id="preview-image" /> 
      </div>
    </div>`;
        this._button_type = ["Cancel", "Save"];
        this._cancelable = false;
        this._image_div;
        this._image_block;
        this._title;
        this._filename;
        this._show_title;
        this._image_div_zoomed = false;
    }

    zoomInImage(e) {

        this._image_div.classList.add("zoom");
        this._image_div_zoomed = true;
        e.stopPropagation();
    }
    zoomOutImage(e) {

        this._image_div.classList.remove("zoom");
        this._image_div_zoomed = false;
        e.stopPropagation();
    }

    onTitlechanged() {
        if (this._show_title.checked) {
            printToCanvas(this._title.value);
            this.loadImageFromCanvas();
        }
        else {
            printToCanvas();
            this.loadImageFromCanvas();
        }
    }

    onFileNameChanged() {
        enablePopupOkBtn(this._filename.value != "");
    }

    loadImageFromCanvas() {
        this._image_div.src = canvas.toDataURL("image/jpeg", 1.0);
    }

    onPopupMenuOpen() {
        super.onPopupMenuOpen();
        popupMenuBody.innerHTML = this._content;

        this._image_div = document.getElementById("preview-image");
        this._image_block = document.getElementsByClassName("block-img")[0];
        this._title = document.getElementById("title");
        this._filename = document.getElementById("filename");
        this._show_title = document.getElementById("showTitle");
        this.loadImageFromCanvas();
        this._image_div.onclick = this.zoomOutImage.bind(this);
        this._image_block.onclick = this.zoomInImage.bind(this);
        this._show_title.onchange = this.onTitlechanged.bind(this);
        this._title.oninput = this.onTitlechanged.bind(this);
        this._filename.oninput = this.onFileNameChanged.bind(this);
    }
    onPopupRequestLeave(event) {
        if (this._image_div_zoomed) {
            this.zoomOutImage(event);
            return false
        }
        return true;
    }

    onPopupMenuClose() {
        setTimeout(() => {
            popupMenuBody.innerHTML = "";
            reserved_for = undefined;
        }, 400);

    }
    onOkBtnClick() {
        if (this._filename.value.includes(".")) {
            var extension = this._filename.value.split(".");
            var dataURL = canvas.toDataURL("image/" + extension[extension.length - 1], 1.0);
            downloadImage(dataURL, this._filename.value);
        }
        else
            downloadImage(dataURL, `${this._filename.value}.jpeg`);

        closePopupMenu();
    }
}

/*------------------Module Specific functions------------------*/
function initTimeAdderModule() {
    reserved_for = new TimeAdderModule();
}
function initLoadLastModule() {
    if (localStorage.getItem("sjson") != undefined) {
        reserved_for = new LoadLastSessionModule();
        openPopupMenu();
    }
}

function initSaveAsImageModule() {
    reserved_for = new saveAsImage();
    openPopupMenu();
}
