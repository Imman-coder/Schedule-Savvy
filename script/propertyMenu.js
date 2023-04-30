const EventPropertiesTab =
    document.getElementsByClassName("event-properties")[0];
injectPropertyMenu();
const selectedEventDiv = document.getElementById("Selected-event");
const jsonTextDiv = document.getElementById("json-text");
var classBlocks = document.getElementsByClassName("inner");

/*--------Class Type defines-----------*/
const dropdown = document.getElementsByClassName("dropdown")[0];
const select = dropdown.getElementsByClassName("select")[0];
const caret = dropdown.getElementsByClassName("caret")[0];
const menu = dropdown.getElementsByClassName("menu")[0];
const options = dropdown
    .getElementsByClassName("menu")[0]
    .getElementsByTagName("li");
const selected = dropdown.getElementsByClassName("selected")[0];

/*---------Class Timespan defines-----------*/
const classTimespan = document.getElementById("class-timespan");
const classTimespanUp = document.getElementById("class-number-up");
const classTimespanDown = document.getElementById("class-number-down");
const minClassNo = classTimespan.getAttribute("min");
const maxClassNo = classTimespan.getAttribute("max");

/*---------Sys defines--------*/
var classtypeList = ["Theory Class", "Lab Class", "Notice"];
var classtypeListr = { "Theory Class": "0", "Lab Class": "1", Notice: "2" };
var activeBlock = test_subs[subList[active[0]][active[1]]];

/*-------------Class Type Dropdown Handlers------------*/
function showMenu() {
    select.classList.add("select-clicked");
    caret.classList.add("caret-rotate");
    menu.classList.add("menu-open");
}
function closeMenu() {
    select.classList.remove("select-clicked");
    caret.classList.remove("caret-rotate");
    menu.classList.remove("menu-open");
}
function toggleMenu(event) {
    event.stopPropagation();
    select.classList.toggle("select-clicked");
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
    });
}

document.body.addEventListener("click", (e) => {
    if (select.classList.contains("select-clicked")) {
        closeMenu();
    }
});

select.addEventListener("click", toggleMenu);

classTimespanDown.addEventListener("click", () => {
    var cval = parseInt(classTimespan.value) - 1;
    if (cval >= minClassNo) {
        classTimespan.value = cval;
        onClassTimespanChange();
    }
});
classTimespanUp.addEventListener("click", () => {
    var cval = parseInt(classTimespan.value) + 1;
    if (cval <= maxClassNo) {
        classTimespan.value = cval;
        onClassTimespanChange();
    }
});

/*-----------------------Menu----------------------------*/

function onEventSelect() {
    activeBlock = test_subs[subList[active[0]][active[1]]];
    classTimespan.value = activeBlock?.time_span || 0;
    var k = activeBlock?.class_type;
    selected.innerHTML = classtypeList[k];
    for (let index = 0; index < options.length; index++) {
        const element = options[index];
        if (index == k) element.classList.add("active");
        else element.classList.remove("active");
    }
    for (let index = 0; index < classBlocks.length; index++) {
        emptyClassBlock(classBlocks[index]);
    }
    for (let idx = 0; idx < activeBlock?.subjects.length || 0; idx++) {
        floodClassBlock(classBlocks[idx], activeBlock.subjects[idx]);
    }

    updateClassBlockText();
    updateDebugWindow();
}

function onClassTypeChange(from) {
    if (from || autoSave) {
        activeBlock.class_type = classtypeListr[selected.innerHTML];
        drawTable();
    }
}

function onClassTimespanChange(from) {
    if (from || autoSave) {
        activeBlock.time_span = classTimespan.value;
        drawTable();
    }
}
function onClassTimespanRange(from) {
    var k = classTimespan.value;
    if (k <= minClassNo) k = minClassNo;
    else if (k >= maxClassNo) k = maxClassNo;
    if (from || autoSave) {
        classTimespan.value = k;
        drawTable();
    }
}

function onClassDetailChange() { }

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
    return lem[0].value == "" && lem[1].value == "" && lem[2].value == "";
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
        
        if (isClassBlockEmpty(elem)) break;
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
    for (let it = 0; it < activeBlock?.subjects.length || 0; it++) {
        const lsb = activeBlock.subjects[it];
        const elm = classBlocks[it];
        const lem = elm.getElementsByTagName("input");
        lem[0].value = lsb.teacher;
        lem[1].value = lsb.subject_code;
        lem[2].value = lsb.subject;
    }
    validateClassBlockView();
}

function onClassBlockTextChange(from) {
    if (from || autoSave) {
        var lsb = [];
        for (let it = 0; it < classBlocks.length; it++) {
            const elm = classBlocks[it];
            if (isClassBlockEmpty(elm)) break;
            else {
                lsb.push(
                    JSON.parse(`
                {
                  "subject": "",
                  "subject_code": "",
                  "teacher": ""
                }`)
                );

                const lem = elm.getElementsByTagName("input");
                lsb[it].teacher = lem[0].value;
                lsb[it].subject_code = lem[1].value;
                lsb[it].subject = lem[2].value;
            }
        }
    }
    activeBlock.subjects = lsb;
    validateClassBlockView();
    drawTable();
}

function onClassBlockDelete(e) {
    emptyClassBlock(classBlocks[e]);
    if (e == 0) {
        var b1 = classBlocks[0].getElementsByTagName("input");
        var b2 = classBlocks[1].getElementsByTagName("input");
        var b3 = classBlocks[2].getElementsByTagName("input");

        b1[0].value = b2[0].value;
        b1[1].value = b2[1].value;
        b1[2].value = b2[2].value;

        b2[0].value = b3[0].value;
        b2[1].value = b3[1].value;
        b2[2].value = b3[2].value;

        emptyClassBlock(classBlocks[2]);
    }
    if (e == 1) {
        var b2 = classBlocks[1].getElementsByTagName("input");
        var b3 = classBlocks[2].getElementsByTagName("input");

        b2[0].value = b3[0].value;
        b2[1].value = b3[1].value;
        b2[2].value = b3[2].value;
        emptyClassBlock(classBlocks[2]);
    }
    validateClassBlockView();
    onClassBlockTextChange();
}

function saveAll() {
    onClassTimespanRange(true);
    onClassBlockTextChange(true);
    onClassTimespanChange(true);
    onClassTypeChange(true);
}

function injectPropertyMenu() {
    var l = `
    <div class="cl-box">
      <span>Class Timespan:</span>
      <div class="k">
        <input
          value="1"
          type="number"
          id="class-timespan"
          name="quantity"
          min="1"
          max="4"
          oninput="javascript:onClassTimespanRange()"
        />
        <div class="counter-btn">
          <div id="class-number-up" class="btn">+</div>
          <div id="class-number-down" class="btn">-</div>
        </div>
      </div>
    </div>
    <div class="dropdown">
      <div class="select">
        <span>Class Type:</span>
        <div class="e">
          <span class="selected">Theory Class</span>
          <div class="caret"></div>
        </div>
      </div>
      <ul class="menu">
        <li class="active">Theory Class</li>
        <li>Lab Class</li>
        <li>Notice</li>
      </ul>
    </div>
    <div class="classDetails">
      <span>Class Details:</span>
      <div class="inner-stack">`;
    for (let index = 0; index < 3; index++) {
        l +=
            `<div class="inner shadow">
          <div onclick="onClassBlockDelete(` +
            index +
            `)" id="close-btn"><span>X</span></div>
          <span class="class-num">Class ` +
            (index + 1) +
            `</span>
          <div class="m">
            <span>Teacher Name:</span>
            <input type="text" name="teacherName" id="teacherName" oninput="javascript:onClassBlockTextChange(false)" placeholder="Prof. Neelam Patel(NP)"/>
          </div>
          <div class="m">
            <span>Subjct Code:</span>
            <input type="text" name="SubjectCode" id="SubjectCode" oninput="javascript:onClassBlockTextChange(false)" placeholder="PRG101"/>
          </div>
          <div class="m">
            <span>Subjct Name:</span>
            <input type="text" name="SubjectName" id="subjectName" oninput="javascript:onClassBlockTextChange(false)" placeholder="Programmin in C(PC)"/>
          </div>
        </div>`;
    }
    l += `</div>
  </div>`;

    EventPropertiesTab.innerHTML = l;
}

onEventSelect();
// initSaveAsImageModule();