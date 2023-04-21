const selectedEventDiv = document.getElementById("Selected-event");
const jsonTextDiv = document.getElementById("json-text");
var classBlocks = document.getElementsByClassName("inner");


/*--------Class Type defines-----------*/
const dropdown = document.getElementsByClassName('dropdown')[0];
const select = dropdown.getElementsByClassName("select")[0];
const caret = dropdown.getElementsByClassName("caret")[0];
const menu = dropdown.getElementsByClassName("menu")[0];
const options = dropdown.getElementsByClassName("menu")[0].getElementsByTagName("li");
const selected = dropdown.getElementsByClassName("selected")[0];

/*---------Class Timespan defines-----------*/
const classTimespan = document.getElementById("class-timespan");
const classTimespanUp = document.getElementById("class-number-up");
const classTimespanDown = document.getElementById("class-number-down");
const minClassNo = classTimespan.getAttribute("min");
const maxClassNo = classTimespan.getAttribute("max");

/*---------Sys defines--------*/
var classtypeList = ["Theory Class", "Lab Class", "Notice"]
var classtypeListr = { "Theory Class": "0", "Lab Class": "1", "Notice": "2" }
var activeBlock = test_subs[subList[active[0]][active[1]]];

/*-------------Class Type Dropdown Handers------------*/
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
function toggleMenu(event) {
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
        onClassTypeChange();

    })
}

document.body.addEventListener("click", (e) => {
    if (select.classList.contains('select-clicked')) {
        closeMenu();
    }
});

select.addEventListener("click", toggleMenu);

classTimespanDown.addEventListener("click", () => {
    var cval = parseInt(classTimespan.value) - 1;
    if (cval >= minClassNo) {
        classTimespan.value = cval
        onClassTimespanChange();
    }

})
classTimespanUp.addEventListener("click", () => {
    var cval = parseInt(classTimespan.value) + 1;
    if (cval <= maxClassNo) {
        classTimespan.value = cval
        onClassTimespanChange();
    }

})




/*-----------------------Menu----------------------------*/

function onEventSelect() {
    activeBlock = test_subs[subList[active[0]][active[1]]];
    classTimespan.value = activeBlock.time_span;
    var k = activeBlock.class_type;
    selected.innerHTML = classtypeList[k];
    for (let index = 0; index < options.length; index++) {
        const element = options[index];
        if (index == k)
            element.classList.add("active");
        else
            element.classList.remove("active");
    }
    for (let index = 0; index < classBlocks.length; index++) {
        emptyClassBlock(classBlocks[index]);

    }
    for (let idx = 0; idx < activeBlock.subjects.length; idx++) {
        floodClassBlock(classBlocks[idx], activeBlock.subjects[idx])
    }

    updateClassBlockText();
    updateDebugWindow();

}

function onClassTypeChange() {
    activeBlock.class_type = classtypeListr[selected.innerHTML];
    drawTable();
}

function onClassTimespanChange() {
    activeBlock.time_span = classTimespan.value;
    drawTable();
}
function onClassTimespanRange() {
    var k = classTimespan.value;
    if (k <= minClassNo) k = minClassNo;
    else if (k >= maxClassNo) k = maxClassNo;
    classTimespan.value = k;
    onClassTimespanChange();
    drawTable();
}

function onClassDetailChange() {

}

function updateDebugWindow() {
    selectedEventDiv.innerText = active;
    // jsonTextDiv.innerText=JSON.stringify(sJson,null, 2);
}

function removeClasBlockShadow(block) {
    block.classList.remove("shadow");
}

function addClasBlockShadow(block) {
    block.classList.add("shadow");

}
function showClasBlock(block) {
    block.classList.remove("hidden");
}

function hideClasBlock(block) {
    block.classList.add("hidden");

}

function isClassBlockEmpty(elem) {
    const lem = elem.getElementsByTagName("input");
    return (lem[0].value == "" && lem[1].value == "" && lem[2].value == "")

}

function emptyClassBlock(elem) {
    const lem = elem.getElementsByTagName("input");
    lem[0].value = "";
    lem[1].value = "";
    lem[2].value = "";
}

function floodClassBlock(elem, sub) {
    const lem = elem.getElementsByTagName("input");
    lem[0].value = sub.teacher;
    lem[1].value = sub.subject_code;
    lem[2].value = sub.subject;
}

function validateClassBlockView() {
    let it = 0;
    for (; it < classBlocks.length; it++) {
        const elem = classBlocks[it];


        if (isClassBlockEmpty(elem))
            break;
        else {
            removeClasBlockShadow(elem);
        }

    }
    if (it < classBlocks.length) {
        const elem = classBlocks[it];
        addClasBlockShadow(elem);
        showClasBlock(elem);
        it++;
    }
    for (; it < classBlocks.length; it++) {
        const elem = classBlocks[it];
        emptyClassBlock(elem);
        hideClasBlock(elem);
    }

}

function updateClassBlockText() {
    for (let it = 0; it < activeBlock.subjects.length; it++) {
        const lsb = activeBlock.subjects[it];
        const elm = classBlocks[it];
        const lem = elm.getElementsByTagName("input");
        lem[0].value = lsb.teacher;
        lem[1].value = lsb.subject_code;
        lem[2].value = lsb.subject;

    }
    validateClassBlockView();
}

function onClassBlockTextChange(event) {
    var lsb = [];
    for (let it = 0; it < classBlocks.length; it++) {
        const elm = classBlocks[it];
        if (isClassBlockEmpty(elm))
            break;
        else {
            lsb.push(JSON.parse(`
                {
                  "subject": "",
                  "subject_code": "",
                  "teacher": ""
                }`));

            const lem = elm.getElementsByTagName("input");
            lsb[it].teacher = lem[0].value;
            lsb[it].subject_code = lem[1].value;
            lsb[it].subject = lem[2].value;
        }
    }
    activeBlock.subjects = lsb;
    validateClassBlockView();
    drawTable();
}

function onClassBlockDelete(e) {

    emptyClassBlock(classBlocks[e]);
    if(e==0){
        var b1 = classBlocks[0].getElementsByTagName("input");
        var b2 = classBlocks[1].getElementsByTagName("input");
        var b3 = classBlocks[2].getElementsByTagName("input");

        b1[0].value=b2[0].value;
        b1[1].value=b2[1].value;
        b1[2].value=b2[2].value;

        b2[0].value=b3[0].value;
        b2[1].value=b3[1].value;
        b2[2].value=b3[2].value;

        emptyClassBlock(classBlocks[2]);
    }
    if(e==1){
        var b2 = classBlocks[1].getElementsByTagName("input");
        var b3 = classBlocks[2].getElementsByTagName("input");

        b2[0].value=b3[0].value;
        b2[1].value=b3[1].value;
        b2[2].value=b3[2].value;
        emptyClassBlock(classBlocks[2]);
    }
    validateClassBlockView();
    onClassBlockTextChange();
}

onEventSelect();