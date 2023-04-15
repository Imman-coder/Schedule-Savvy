const dropdown = document.getElementsByClassName('dropdown')[0];

const select = dropdown.getElementsByClassName("select")[0];
const caret = dropdown.getElementsByClassName("caret")[0];
const menu = dropdown.getElementsByClassName("menu")[0];
const options = dropdown.getElementsByClassName("menu")[0].getElementsByTagName("li");
const selected = dropdown.getElementsByClassName("selected")[0];

function showMenu() {
    select.classList.add('select-clicked');
    caret.classList.add("caret-rotate");
    menu.classList.add("menu-open");
}
function closeMenu() {
    select.classList.remove('select-clicked');
    caret.classList.remove("caret-rotate");
    menu.classList.remove("menu-open");
}
function toggleMenu(event){
    event.stopPropagation();
    select.classList.toggle('select-clicked');
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
}



for (let index = 0; index < options.length; index++) {
    const option = options[index];
    option.addEventListener("click", () => {
        selected.innerHTML = option.innerText;
        select.classList.remove("select-clicked");
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        for (let ei = 0; ei < options.length; ei++) {
            const k = options[ei];
            k.classList.remove("active");
        }

        option.classList.add("active");

    })
}

document.body.addEventListener("click", (e) => {
    if (select.classList.contains('select-clicked')) {
        closeMenu();
    }
});

select.addEventListener("click",toggleMenu);

const classNumberUp = document.getElementById("class-number-up");
const classNumberDown = document.getElementById("class-number-down");
const classNumberDiv = document.getElementById("class-number");
const minClassNo = classNumberDiv.getAttribute("min");
const maxClassNo = classNumberDiv.getAttribute("max");

classNumberDown.addEventListener("click",()=>{
    var cval = parseInt(classNumberDiv.value)-1;
    if(cval>=minClassNo)
        classNumberDiv.value=cval
})
classNumberUp.addEventListener("click",()=>{
    var cval = parseInt(classNumberDiv.value)+1;
    if(cval<=maxClassNo)
        classNumberDiv.value=cval
})