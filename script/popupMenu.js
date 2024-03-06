/*-------------------Menu Defines------------------------*/
const popupMenu = document.getElementById("modal-box");
const popupMenuBody = popupMenu.getElementsByClassName("box-content")[0];
var popupMenuOkBtn = document.getElementById("modal-ok-btn");
var popupMenuCancelBtn = document.getElementById("modal-cancel-btn");
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
    if (reserved_for != undefined ) {
        let k = reserved_for.onPopupMenuClose();
        if(k == undefined || k == true)
            popupMenu.classList.remove("show-popupMenu");
    }
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
function enablePopupCancelBtn(enable = false) {
    if (enable) {
        popupMenuCancelBtn.classList.remove("disable");
    } else {
        popupMenuCancelBtn.classList.add("disable");
    }
}

/*---------------------Handler functions---------------------*/
popupMenuCancelBtn.addEventListener("click",closePopupMenu);

popupMenu.addEventListener("click", (event) => {
    if (event.target == popupMenu) {

        if (reserved_for.onPopupRequestLeave(event) && reserved_for._cancelable) closePopupMenu();
    }
});

/*-------------------Module Specific Class Declerations-------------------*/
class TimeAdderModule extends popupMenuDisplayModule {
    constructor(initTime,callback) {
        super();
        this._content = `
        <a>Add Time </a>
        <input class="time" value="`+invertFormatTime(intToTime(initTime))+`:00" type="time" autofocus />`;

        this.modalTextBox;
        this._cancelable = true;
        this._button_type = 1;
        this._callback =  callback;
        this._initTime = initTime;
    }
    isValid() {
        return this.modalTextBox.value != "";
    }
    onOkBtnClick() {
        var l = timeToInt(formatTime(this.modalTextBox.value));
        this._callback(l)
        // if (!Table.Data.TimeList.includes(l.toString())) Table.addTimeLineStamp(l);
        // else snackbar.show("Time already added!", snackbar.Error, 3000);
        // closePopupMenu();
    }
    onPopupMenuClose() {
        this.modalTextBox.removeEventListener("change", () => {
            enablePopupOkBtn(this.isValid());
        });
        this.modalTextBox = null;
        setTimeout(() => {
            popupMenuBody.innerHTML = "";
            reserved_for = undefined;
        }, 400);
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
        setTimeout(() => {
            popupMenuBody.innerHTML = "";
            reserved_for = undefined;
        }, 400);
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
        this._cancelable = true;
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

class ConfirmLoadProject extends popupMenuDisplayModule {
    constructor(okCallback){
        super();
        this._content = `Do you really want to load this project?`
        this._cancelable = true;
        this._button_type = 0;
        this._okCallback = okCallback
        enablePopupOkBtn(true)
    }

    onPopupMenuOpen(){
        super.onPopupMenuOpen()
        popupMenuBody.innerHTML = this._content;

    }
    onPopupMenuClose(){

    }
    onOkBtnClick(){
        closePopupMenu();
        this._okCallback()
    }
}

class FirstTimeWalkthrough extends popupMenuDisplayModule {
    constructor(){
        super();
        this._button_type = ["Previous", "Next"];
        enablePopupCancelBtn()
        enablePopupOkBtn(true)
        this._page_no = 5
        this._page_count;
        this.refreshPageContent()
    }

    refreshPageContent(){
        var pageContent = [
            `
            <H1>Welcome!!</H1>
            <br> 
            This  tool is designed to create timetable images and datasets seamlessly. With just a few clicks, you'll have organized data ready to fuel your future projects. Let's dive in and optimize your time!
            `,
            `
            <H3>Creating Timeslots</H3>
            <br> You create timeslots and enter by clicking on Add Time or in the Edit menu in top left menu. This creates slots for events to be scheduled.
            `,
            `
            <H3>Editing or Deleting Timeslot</H3>
            <br> Right clicking on timeslot will open up a context menu to edit or delete the timeslot.
            `,
            `
            <H3>Creating Events</H3>
            <br> You can directly create events by clicking on + button corresponding to each day you want to add. Additionally you can enter details related to that Event in the bottom section.
            `,
            `
            <H3>Managing Events</H3>
            <br> You can easily drag and drop events to arrange. You can also ctrl+ drag drop to create duplicates. Right clicking opens up context menu for more flexiblity.
            <br><br> PS: You need not to create duplicate events for each already existing event.
            `,
            `
            <H3>Exporting</H3>
            <br> This tools allows you to export the data in json format which then can be used elsewhere or export it directly as Image.
            `
        ]
        this._page_count = pageContent.length

        popupMenuBody.innerHTML = pageContent[this._page_no];
        enablePopupCancelBtn(this._page_no > 0);
        enablePopupOkBtn(this._page_no < pageContent.length );
        if(this._page_no == this._page_count -1){
            this._button_type = ["Previous", "Finish"];
        } else {
            this._button_type = ["Previous", "Next"];
        }
        this.onPopupMenuOpen();
    }
    onOkBtnClick(){
        this._page_no ++;
        if(this._page_no == this._page_count){
            closePopupMenu();
        }
        console.log(this._page_no);
        this.refreshPageContent()
    }

    onPopupMenuClose(){
        if(this._page_no == this._page_count){
            return true;
        }
        this._page_no --;
        this.refreshPageContent()
        return false;
    }

    onPopupMenuOpen(){
        super.onPopupMenuOpen()

    }
}

/*------------------Module Specific functions------------------*/
function initTimeAdderModule() {
    reserved_for = new TimeAdderModule(0,(l)=>{
        if (!Table.Data.TimeList.includes(l.toString())) Table.addTimeLineStamp(l);
        else snackbar.show("Time already added!", snackbar.Error, 3000);
        closePopupMenu();
    });
}
function initTimeEditModule() {
    const id = contextMenu.x()
    const time = Table.Data.TimeList[id]
    reserved_for = new TimeAdderModule(time,(l)=>{
        if (!Table.Data.TimeList.includes(l.toString())) {
            Table.deleteTimeLineStamp(id);
            Table.addTimeLineStamp(l);
        }
        else snackbar.show("Time already exists!", snackbar.Error, 3000);
        closePopupMenu();
    });
}
function initLoadLastModule() {
    if (localStorage.getItem(tableId) != undefined) {
        reserved_for = new LoadLastSessionModule();
        openPopupMenu();
    }
}

function initLoadProject(callback){
    reserved_for = new ConfirmLoadProject(callback)
    openPopupMenu()
}

function initSaveAsImageModule() {
    reserved_for = new saveAsImage();
    openPopupMenu();
}

function showFirstTimeScreen(){
    reserved_for = new FirstTimeWalkthrough();
    openPopupMenu();
}

showFirstTimeScreen()