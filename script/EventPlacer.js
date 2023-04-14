var main,
    singleEvents,
    timeLineItems,
    timeDayItems,
    timeLineStart,
    thisEvent,
    eventTimeStart,
    eventTimeEnd, 
    eventStart,
    eventWidth;


function placeEvents(){
    var timeLineWidth = (timeLineItems[1].getBoundingClientRect().x) - (timeLineItems[0].getBoundingClientRect().x);
    
    for(var i = 0; i < this.singleEvents.length; i++) {
        thisEvent = singleEvents[i];

            

        eventTimeStart = thisEvent.getAttribute("time-start")
        eventTimeEnd = thisEvent.getAttribute("time-end"), 
        // eventStart = 4.5+timeLineStart-(timeDayItems[0].getBoundingClientRect().x),
        eventStart = timeLineStart-151+37,
        eventWidth = timeLineWidth*(eventTimeEnd-eventTimeStart);
        eventHeight = timeDayItems[0].getBoundingClientRect().height;
        // timeLineItems    


        if(thisEvent.className.includes("active")){ eventWidth-=4; eventHeight-=4; }
        if(thisEvent.getAttribute("type")=="0") eventHeight = 0;


        thisEvent.setAttribute('style', ' left: '+(eventStart)+'px; width: '+(eventWidth)+'px; height:'+(eventHeight)+'px; background-color:'+thisEvent.getAttribute('color'));
        
    }
}
window.addEventListener("resize", placeEvents);
