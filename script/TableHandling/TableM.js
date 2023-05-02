const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var main,
    singleEvents,
    timeLineItems,
    timeDayItems,
    timeLineStart,
    thisEvent,
    eventTimeSpan,
    eventTimeEnd,
    eventStart,
    eventWidth;

function createInterceptor(obj, callback) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            if (key == "dump") return JSON.stringify(obj);
            if(key=="sort"){
                console.log("yay");
            } 
            const value = Reflect.get(target, key, receiver);
            if (typeof value === "object" && value !== null) {
                return createInterceptor(value, callback);
            }
            return value;
        },
        set(target, key, value, receiver) {
            if (key == "dump") {
                var j = JSON.parse(value);
                for (var v in j) {
                    Reflect.set(target, v, j[v], receiver);
                }
                return;
            }
            const result = Reflect.set(target, key, value, receiver);
            callback(target, key, value, receiver);
            return result;
        },
    });
}


function AdjustPlacement() {
    var timeLineWidth = (timeLineItems[1]?.getBoundingClientRect().x || 0) - (timeLineItems[0]?.getBoundingClientRect().x || 0);
    timeLineStart = timeLineItems[0]?.getBoundingClientRect().x || 150;

    for (var i = 0; i < this.singleEvents.length; i++) {
        thisEvent = singleEvents[i];



        eventTimeSpan = thisEvent.getAttribute("time-span")
        // eventStart = 4.5+timeLineStart-(timeDayItems[0].getBoundingClientRect().x),
        eventStart = timeLineStart - 150 + 25.5,
            eventWidth = timeLineWidth * (eventTimeSpan);
        eventHeight = timeDayItems[0].getBoundingClientRect().height;

        if (eventWidth >= 150 * eventTimeSpan) eventWidth = 150 * eventTimeSpan;
        if (eventWidth <= 0) eventWidth = 100;


        if (thisEvent.className.includes("active")) { eventWidth -= 4; eventHeight -= 4; }


        thisEvent.setAttribute('style', ' left: ' + (eventStart) + 'px; width: ' + (eventWidth) + 'px; height:' + (eventHeight) + 'px; background-color:' + thisEvent.getAttribute('color'));

    }
};


function Draw() {
    const { table, timeList, base } = sJson;
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

        for (let j = 0; j <= table[i].length; j++) {
            const ar = table[i][j];

            var x = "";
            if (active != undefined) if (i == active[0] && j == active[1]) x = "active";

            // if (n > timeList.length - 2)
            //     break;

            if (j == table[i].length) {
                k += `<div type="-1" x="` + i + `" y="` + j + `" time-span ="1" class="subCard plus">+</div>`;
            }
            else {
                var subs = "";
                if (base[ar].class_type == 2)
                    subs = base[ar].subjects[0]?.subject || "";
                else if (base[ar].subjects.length == 1) {
                    subs = getFirstLetters(base[ar].subjects[0].subject) + "(" + getFirstLetters(base[ar].subjects[0]?.teacher || "") + ")";
                }
                else {
                    subs = "";
                    for (let a = 0; a < base[ar].subjects.length; a++) {
                        const lsu = base[ar].subjects[a];
                        subs += getFirstLetters(lsu.subject) + "(" + getFirstLetters(lsu.teacher) + ")";
                        if (a != base[ar].subjects.length - 1)
                            subs += "/";
                    }
                }
                var bubl = base[ar].class_type == "1" ? "L" : (base[ar].class_type == "2" ? "N" : "");
                k += `<div type="` + base[ar].class_type + `" x="` + i + `" y="` + j + `" draggable="true"  time-span="` + base[ar].time_span + `" class="subCard ` + x + `" color="` + colorTable[ar] + `";> <div class="badge">` + bubl + `</div>` + subs + `</div>
                    `;
                n += base[ar].time_span;
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
        timeLineStart = timeLineItems[0]?.getBoundingClientRect().x || 150;
    // placeEvents();
    AdjustPlacement();
    initListeners();
};



// Create the interceptor with a callback function
const Table = createInterceptor(sJson, (obj, key, value, receiver) => {
    if (JSON.stringify(value) != undefined) {
        if (SHOW_DEBUG_MESSAGES)
            console.log(`Changed property '${key}' to '${JSON.stringify(value)}'`);
        Draw();
    }
});

Table.Draw = Draw;
Table.AdjustPlacement = AdjustPlacement;
generateColorPalette();


window.addEventListener("resize", Table.AdjustPlacement);