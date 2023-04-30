

/**
 * This function adds a timestamp to a list, sorts the list, draws a table, and sets the start position
 * of a timeline if it's the first timestamp added.
 * @param time - The time parameter is a variable that represents a specific time value that is being
 * added to a list called timeList. This function is likely part of a larger program that is creating a
 * timeline of events or activities, and the time parameter is used to keep track of when each event
 * occurred.
 */
function addTimeLineStamp(time) {
    timeList.push(time)
    sortTimeList();
    drawTable();
    if (timeList.length == 1) timeLineStart = timeLineItems[0].getBoundingClientRect().x;
}



document.getElementById("myfile").addEventListener("change", (event) => {
    var reader = new FileReader();
    reader.onload = () => {
        loadContentToTable(JSON.parse(reader.result));
    };
    reader.readAsText(event.target.files[0]);

})