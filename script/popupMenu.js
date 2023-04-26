
/*-------------------Menu Defines------------------------*/
const popupMenu = document.getElementById("modal-box");
const popupMenuBody = popupMenu.getElementsByClassName("box-content")[0];
const popuMenuOkBtn = document.getElementById("modal-ok-btn");
const popupMenuCancelBtn = document.getElementById("modal-cancel-btn");
var reserved_for;


/*------------------Popup Display Module-----------------*/
class popupMenuDisplayModule {
    constructor() {
        if(this.constructor == popupMenuDisplayModule){
            console.error(" Object of Abstract Class cannot be created");
        }
        this._content;
    }
    isValid(){
        console.error("Abstract Method has no implementation");
    }
    injectContent(){
        console.error("Abstract Method has no implementation");
    }
    onOkBtnClick(){
        console.error("Abstract Method has no implementation");
    }
    onPopupMenuClose(){
        console.error("Abstract Method has no implementation");
    }
  
  };



/*---------------------------Popup Menu Functions---------------------------*/
function closePopupMenu(){
    if(reserved_for!=undefined)
        reserved_for.onPopupMenuClose();
    popupMenu.classList.remove("show-popupMenu");
}

function openPopupMenu(){
    popupMenu.classList.add("show-popupMenu");
}

function popupMenuOkBtn(enable=false) {
    if (enable) {
        popuMenuOkBtn.classList.remove("disable");
        popuMenuOkBtn.addEventListener("click", reserved_for.onOkBtnClick);
    }
    else {
        popuMenuOkBtn.classList.add("disable");
        popuMenuOkBtn.removeEventListener("click", reserved_for.onOkBtnClick);
    }
}



/*---------------------Handler functions---------------------*/
popupMenuCancelBtn.addEventListener("click", closePopupMenu);

popupMenu.addEventListener("click", (event)=>{
    if(event.target==popupMenu) closePopupMenu();
})



/*-------------------Module Specific Class Declerations-------------------*/
class TimeAdderModule extends popupMenuDisplayModule{
    constructor(){
        super();
        this._content = `
        <a>Add Time </a>
        <input class="time" type="time" />`;

        this.modalTextBox;
    }
    isValid(){
        return this.modalTextBox.checkValidity();
    }
    onOkBtnClick(){
        addTimeLineStamp(timeToInt(formatTime(this.modalTextBox.value)));
        closePopupMenu();
    }
    onValueChange(){
        popupMenuOkBtn(this.isValid());
    }
    injectContent(){
        popupMenuBody.innerHTML= this._content;
        this.modalTextBox = popupMenuBody.getElementsByClassName("time")[0];
        this.modalTextBox.addEventListener("change", this.onValueChange);
    }
    onPopupMenuClose(){
        this.modalTextBox.value='';
    }

}



/*------------------Module Specific functions------------------*/
function initTimeAdderModule() {
    reserved_for = new TimeAdderModule()
    reserved_for.injectContent();
}