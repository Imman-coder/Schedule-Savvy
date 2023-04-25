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


function placeEvents(){
    var timeLineWidth = (timeLineItems[1]?.getBoundingClientRect().x||0) - (timeLineItems[0]?.getBoundingClientRect().x||0);
    timeLineStart = timeLineItems[0]?.getBoundingClientRect().x||150;
    
    for(var i = 0; i < this.singleEvents.length; i++) {
        thisEvent = singleEvents[i];

            

        eventTimeSpan = thisEvent.getAttribute("time-span")
        // eventStart = 4.5+timeLineStart-(timeDayItems[0].getBoundingClientRect().x),
        eventStart = timeLineStart-150+25.5,
        eventWidth = timeLineWidth*(eventTimeSpan);
        eventHeight = timeDayItems[0].getBoundingClientRect().height;

        if(eventWidth>=150*eventTimeSpan) eventWidth = 150*eventTimeSpan;
        if(eventWidth <=0) eventWidth = 100;


        if(thisEvent.className.includes("active")){ eventWidth-=4; eventHeight-=4; }


        thisEvent.setAttribute('style', ' left: '+(eventStart)+'px; width: '+(eventWidth)+'px; height:'+(eventHeight)+'px; background-color:'+thisEvent.getAttribute('color'));
        
    }
}
window.addEventListener("resize", placeEvents);
