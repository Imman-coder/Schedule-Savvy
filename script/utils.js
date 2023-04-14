

const normalizePozition = (mouseX, mouseY) => {
  // ? compute what is the mouse position relative to the container element (scope)
  let {
    left: scopeOffsetX,
    top: scopeOffsetY,
  } = document.body.getBoundingClientRect();

  scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
  scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

  const scopeX = mouseX - scopeOffsetX;
  const scopeY = mouseY - scopeOffsetY;

  // ? check if the element will go out of bounds
  const outOfBoundsOnX =
    scopeX + contextMenu.clientWidth > document.body.clientWidth;

  const outOfBoundsOnY =
    scopeY + contextMenu.clientHeight > document.body.clientHeight;

  let normalizedX = mouseX;
  let normalizedY = mouseY;

  // ? normalize on X
  if (outOfBoundsOnX) {
    normalizedX =
      scopeOffsetX + document.body.clientWidth - contextMenu.clientWidth;
  }

  // ? normalize on Y
  if (outOfBoundsOnY) {
    normalizedY =
      scopeOffsetY + document.body.clientHeight - contextMenu.clientHeight;
  }

  return { normalizedX, normalizedY };
};



function formatTime(timeString) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  const s = (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  return (s.length == 6) ? "0" + s : s;
}


function timeToInt(a){
    
  const [hs, m] = a.split(":");
  var time = parseInt(m.substring(0,2));
  if(m[2]=='P') {
      time+=12*60;
      if(hs!="12"){
          time+=parseInt(hs)*60;
      }
  }
  else{
      time+=parseInt(hs)*60;
  }
  return time
}