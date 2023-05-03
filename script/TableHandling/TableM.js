const dayList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
var main,
    singleEvents,
    timeLineItems,
    timeDayItems,
    timeLineStart,
    thisEvent,
    eventTimeSpan,
    eventTimeEnd,
    eventStart,
    eventHeight,
    eventWidth,
    time_divider_group;

var colorTable = [];

class Table {
    static #EventData = {
        EventTable: sJson.table,
        TimeList: sJson.timeList,
        EventList: sJson.base,
        active: [1, 1],
        copiedEvent,
    };


    static createInterceptor(obj, callback) {
        const self = this;
        return new Proxy(obj, {
            get(target, key, receiver) {
                if (key == "dump") return JSON.stringify(obj);
                const value = Reflect.get(target, key, receiver);
                if (typeof value === "object" && value !== null) {
                    return self.createInterceptor(value, callback);
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
                if (key == "active") {
                    value[0] = parseInt(value[0]);
                    value[1] = parseInt(value[1]);
                }
                const result = Reflect.set(target, key, value, receiver);
                callback(target, key, value, receiver);
                return result;
            },
        });
    }

    /**
     * The function adjusts the placement and size of events on a timeline based on their time span and the
     * width of the timeline.
     */
    static AdjustPlacement() {
        var timeLineWidth =
            (timeLineItems[1]?.getBoundingClientRect().x || 0) -
            (timeLineItems[0]?.getBoundingClientRect().x || 0);
        timeLineStart = timeLineItems[0]?.getBoundingClientRect().x || 150;

        for (var i = 0; i < singleEvents.length; i++) {
            thisEvent = singleEvents[i];

            eventTimeSpan = thisEvent.getAttribute("time-span");
            eventStart = timeLineStart - 150 + 25.5;
            eventWidth = timeLineWidth * eventTimeSpan;
            eventHeight = timeDayItems[0].getBoundingClientRect().height;

            if (eventWidth >= 150 * eventTimeSpan) eventWidth = 150 * eventTimeSpan;
            if (eventWidth <= 0) eventWidth = 100;

            if (thisEvent.className.includes("active")) {
                eventWidth -= 4;
                eventHeight -= 4;
            }

            thisEvent.setAttribute(
                "style",
                " left: " +
                eventStart +
                "px; width: " +
                eventWidth +
                "px; height:" +
                eventHeight +
                "px; background-color:" +
                thisEvent.getAttribute("color")
            );
        }
    }

    /**
     * The function Draw() is responsible for generating and rendering the schedule table and timeline in
     * HTML based on the data provided in EventData.
     */
    static Draw() {
        const { EventTable: table, TimeList: timeList, EventList: base } = this.#EventData;
        var dayWrapper = document.getElementById("day-wrapper");
        var timeDivider = document.getElementById("time-divider");
        var k = "";
        for (let i = 0; i < dayList.length; i++) {
            const element = dayList[i];
            k +=
                `<div class="event-list">
                <div class="dayCard">
                    ` +
                element +
                `
                </div>
                <div class="subcard-holder">`;
            var n = 0;

            for (let j = 0; j <= table[i].length; j++) {
                const ar = table[i][j];

                var x = "";
                if (this.Data.active != undefined)
                    if (i == this.Data.active[0] && j == this.Data.active[1]) x = "active";

                // if (n > timeList.length - 2)
                //     break;

                if (j == table[i].length) {
                    k +=
                        `<div type="-1" x="` +
                        i +
                        `" y="` +
                        j +
                        `" time-span ="1" class="subCard plus">+</div>`;
                } else {
                    var subs = "";
                    if (base[ar].class_type == 2)
                        subs = base[ar].subjects[0]?.subject || "";
                    else if (base[ar].subjects.length == 1) {
                        subs =
                            getFirstLetters(base[ar].subjects[0].subject) +
                            "(" +
                            getFirstLetters(base[ar].subjects[0]?.teacher || "") +
                            ")";
                    } else {
                        subs = "";
                        for (let a = 0; a < base[ar].subjects.length; a++) {
                            const lsu = base[ar].subjects[a];
                            subs +=
                                getFirstLetters(lsu.subject) +
                                "(" +
                                getFirstLetters(lsu.teacher) +
                                ")";
                            if (a != base[ar].subjects.length - 1) subs += "/";
                        }
                    }
                    var bubl =
                        base[ar].class_type == "1"
                            ? "L"
                            : base[ar].class_type == "2"
                                ? "N"
                                : "";
                    k +=
                        `<div type="` +
                        base[ar].class_type +
                        `" x="` +
                        i +
                        `" y="` +
                        j +
                        `" draggable="true"  time-span="` +
                        base[ar].time_span +
                        `" class="subCard ` +
                        x +
                        `" color="` +
                        colorTable[ar] +
                        `";> <div class="badge">` +
                        bubl +
                        `</div>` +
                        subs +
                        `</div>
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
            m +=
                `<div class="schedule-timeline"><div x="` +
                index +
                `"  class="circle"></div><span x="` +
                index +
                `" >` +
                intToTime(time) +
                `</span></div>
        `;
        }
        timeDivider.innerHTML = m;
        (main = document.getElementById("main")),
            (singleEvents = document.getElementsByClassName("subCard")),
            (timeLineItems = document.getElementsByClassName("schedule-timeline")),
            (timeDayItems = document.getElementsByClassName("dayCard")),
            (timeLineStart = timeLineItems[0]?.getBoundingClientRect().x || 150);
        time_divider_group = document.getElementById("time-divider");
        this.AdjustPlacement();
        initListeners();
    }

    /**
     * The function sorts a list of time values in ascending order.
     */
    static SortTime() {
        this.#EventData.TimeList.sort();
    }

    static InterceptorFunction(obj, key, value, receiver) {
        if (JSON.stringify(value) != undefined) {
            if (SHOW_DEBUG_MESSAGES)
                console.log(
                    `Changed property '${key}' to '${JSON.stringify(value)}'`
                );
            if (key == "active") onEventSelect();
            if (key == "TimeList") this.SortTime();
            this.Draw();
        }

    }

    // Create the interceptor with a callback function
    static Data = this.createInterceptor(
        this.#EventData,
        this.InterceptorFunction.bind(this)
    );

    /**
     * The function returns the event ID based on the given x and y coordinates from the event table
     * data.
     * @param x - The row index of the EventTable array.
     * @param y - The parameter "y" is the column index of the 2D array "EventTable".
     * @returns The function `getEventID` is returning the value at the position `[x][y]` in the
     * `EventTable` array of the `Data` object.
     */
    static getEventID(x, y) {
        return this.Data.EventTable[x][y];
    }

    /**
     * This function adds an event ID to a specific location in an event table and triggers an
     * interceptor function.
     * @param x - The index of the row in the EventTable array where the eventID will be added.
     * @param y - The index at which the eventID should be inserted in the array located at
     * EventTable[x].
     * @param eventID - The ID of the event being added to the event table at the specified x and y
     * coordinates.
     */
    static putEvent(x, y, eventID) {
        this.#EventData.EventTable[x || this.Data.active[0]].splice(y || this.Data.active[1], 0, eventID || this.Data.copiedEvent);
        this.InterceptorFunction("", "Event", "Added", "");
    }

    /**
     * This function deletes an event from an event table and triggers an interceptor function.
     * @param x - The index of the event table array where the event to be deleted is located.
     * @param y - The parameter "y" represents the index of the event to be deleted from the EventTable
     * array at position "x".
     */
    static deleteEvent(x, y) {
        this.#EventData.EventTable[x || this.Data.active[0]].splice(y || this.Data.active[1], 1);
        this.InterceptorFunction("", "Event", "Deleted", "");
    }

    /**
     * This function moves an event from one position to another in an event table and triggers an
     * interceptor function.
     * @param sx - The starting x-coordinate of the event being moved.
     * @param sy - The parameter "sy" in the "moveEvent" function likely stands for the starting
     * y-coordinate of the event being moved.
     * @param dx - dx is the destination x-coordinate where the event will be moved to.
     * @param dy - dy stands for "destination y-coordinate" and represents the vertical position where
     * the event will be moved to in the EventTable.
     */
    static moveEvent(sx, sy, dx, dy) {
        this.#EventData.EventTable[dx].splice(dy, 0, this.#EventData.EventTable[sx].splice(sy, 1)[0]);
        this.InterceptorFunction("", "Event", "Moved", "");
    }

    static putEventAfter(x, y, eventID) {
        this.#EventData.EventTable[x || this.Data.active[0]].splice((y || this.Data.active[1]) + 1, 0, (eventID || this.Data.copiedEvent));
        this.InterceptorFunction("", "Event", "Added", "");
    }

    static copyEvent(x, y) {
        this.#EventData.copiedEvent = this.Data.EventTable[x || this.Data.active[0]][y || this.Data.active[1]];
    }

    static cutEvent(x, y) {
        this.#EventData.copiedEvent = this.Data.EventTable[x || this.Data.active[0]][y || this.Data.active[1]];
        this.#EventData.EventTable[x || this.Data.active[0]].splice(y || this.Data.active[1], 1);
        this.InterceptorFunction("", "Event", "Cut", "");
    }

    static addNewBlankEvent(x, y) {
        var id = getNewEventId();
        this.#EventData.EventList[id.toString()] = JSON.parse(JSON.stringify(EventBlock));
        this.#EventData.EventList[x].push(id);
        this.Data.active = [x, y];
    }

    static addTimeLineStamp(time) {
        this.Data.TimeList.push(time)
        if (timeList.length == 1)
            timeLineStart = timeLineItems[0].getBoundingClientRect().x;
    }

}


generateColorPalette();

window.addEventListener("resize", Table.AdjustPlacement);
