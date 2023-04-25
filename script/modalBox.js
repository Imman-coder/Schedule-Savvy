
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