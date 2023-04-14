const dayList = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

var subList = rJson["table"],
    timeList = rJson["timeList"],
    test_subs = rJson["base"];

var colorTable = [];

var active = [1,4];
var activeprev = [-1,-1];
drawTable();
function drawTable(){
    var dayWrapper = document.getElementById("day-wrapper");
    var timeDivider = document.getElementById("time-divider");
    var k="";
    for (let i = 0; i < dayList.length; i++) {
        const element = dayList[i];
        k+=`<div class="event-list">
                <div class="dayCard">
                    `+element+`
                </div>
                <div class="subcard-holder">`;
            var n=0;

            for (let j = 0; j <= subList[i].length; j++) {
                const ar = subList[i][j];
                    
                var x="";
                if(i==active[0] && j==active[1]) x="active";

                if(n > timeList.length-2)
                    break;
                    
                if(j==subList[i].length){
                    k+=`<div type="2" x="`+i+`" y="`+j+`" time-start="`+n+`" time-end="`+(n+1)+ `" class="subCard plus">+</div>`;
                }
                else{
                    k+=`<div type="1" x="`+i+`" y="`+j+`" draggable="true"  time-start="`+n+`" time-end="`+(n+(test_subs[ar].time))+`" class="subCard `+x+`" color="`+test_subs[ar].color+`";>`+test_subs[ar].name+`</div>
                    `;
                n+=test_subs[ar].time;
                }
            }
        k+=`</div>
        </div>`;
    }
    dayWrapper.innerHTML=k;

    var m="";
    for (let index = 0; index < timeList.length; index++) {
        const time = timeList[index];
        m+=`<div class="schedule-timeline"><div class="circle"></div><span>`+time+`</span></div>
        `;
    }
    timeDivider.innerHTML=m;
    main = document.getElementById("main"),
    singleEvents = document.getElementsByClassName("subCard"),
    timeLineItems = document.getElementsByClassName("schedule-timeline"),
    timeDayItems = document.getElementsByClassName("dayCard"),
    timeLineStart = timeLineItems[0].getBoundingClientRect().x;
    placeEvents();
    initListeners();
}


function sortTimeList(){
    timeList.sort((a,b)=>{
        return timeToInt(a)>timeToInt(b)?1:-1;
    })
}

function addTimeLineStamp(time){
    timeList.push(time)
    sortTimeList();
    drawTable();
}

function test(){
    var k=[];
    timeList.map((x)=>{k.push( timeToInt(x).toString())})
    console.log(k);
}
