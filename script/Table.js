const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var subList = sJson["table"],
    timeList = sJson["timeList"],
    test_subs = sJson["base"];

var colorTable = [];

document.getElementById("myfile").addEventListener("change", (event) => {
    var reader = new FileReader();
    reader.onload = () => {
        sJson = JSON.parse(reader.result);
        console.log(sJson);
        subList = sJson["table"],
        timeList = sJson["timeList"],
        test_subs = sJson["base"];
        drawTable();
    };
    reader.readAsText(event.target.files[0]);

})

var active = [1, 4];
var activeprev = [-1, -1];
const backgroundColor = '#1a1a1a';
const textColor = '#e8e8e8';
generateColorPalette();

function drawTable() {
    var dayWrapper = document.getElementById("day-wrapper");
    var timeDivider = document.getElementById("time-divider");
    var k = "";
    for (let i = 0; i < dayList.length; i++) {
        const element = dayList[i];
        k += `<div class="event-list">
                <div class="dayCard">
                    `+ element + `
                </div>
                <div class="subcard-holder">`;
        var n = 0;

        for (let j = 0; j <= subList[i].length; j++) {
            const ar = subList[i][j];

            var x = "";
            if (i == active[0] && j == active[1]) x = "active";

            // if (n > timeList.length - 2)
            //     break;

            if (j == subList[i].length ) {
                k += `<div type="-1" x="` + i + `" y="` + j + `" time-span ="1" class="subCard plus">+</div>`;
            }
            else {
                var subs="";
                if (test_subs[ar].class_type == 2)
                    subs = test_subs[ar].subjects[0]?.subject || "";
                else if (test_subs[ar].subjects.length == 1) {
                    subs = getFirstLetters(test_subs[ar].subjects[0].subject) + "(" + getFirstLetters(test_subs[ar].subjects[0]?.teacher || "") + ")";
                }
                else {
                    subs = "";
                    for (let a = 0; a < test_subs[ar].subjects.length; a++) {
                        const lsu = test_subs[ar].subjects[a];
                        subs += getFirstLetters(lsu.subject) + "(" + getFirstLetters(lsu.teacher) + ")";
                        if (a != test_subs[ar].subjects.length - 1)
                            subs += "/";
                    }
                }
                var bubl = test_subs[ar].class_type == "1" ? "L" : (test_subs[ar].class_type == "2" ? "N" : "");
                k += `<div type="` + test_subs[ar].class_type + `" x="` + i + `" y="` + j + `" draggable="true"  time-span="` + test_subs[ar].time_span + `" class="subCard ` + x + `" color="` + colorTable[ar] + `";> <div class="badge">` + bubl + `</div>` + subs + `</div>
                    `;
                n += test_subs[ar].time_span;
            }
        }
        k += `</div>
        </div>`;
    }
    dayWrapper.innerHTML = k;

    var m = "";
    for (let index = 0; index < timeList.length; index++) {
        const time = timeList[index];
        m += `<div class="schedule-timeline"><div x="` + index + `"  class="circle"></div><span x="` + index + `" >` + intToTime(time) + `</span></div>
        `;
    }
    timeDivider.innerHTML = m;
    main = document.getElementById("main"),
        singleEvents = document.getElementsByClassName("subCard"),
        timeLineItems = document.getElementsByClassName("schedule-timeline"),
        timeDayItems = document.getElementsByClassName("dayCard"),
        timeLineStart = timeLineItems[0]?.getBoundingClientRect().x||150;
    placeEvents();
    initListeners();
}


function addTimeLineStamp(time) {
    timeList.push(time)
    sortTimeList();
    drawTable();
    if(timeList.length==1) timeLineStart = timeLineItems[0].getBoundingClientRect().x;
}

