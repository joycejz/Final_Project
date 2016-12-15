//BUTTON BASE CLASS
//tried to use inheritance but it didn't work out

function Button(xPos,yPos) {
  this.x=xPos;
  this.y=yPos;
  this.hover=false;
  this.selected=false;
}

Button.prototype.ifHover=function(x,y) {
  if(abs(x-this.x)<=this.w/2 && abs(y-this.y)<=this.h/2) {
    this.hover=true;
    //tests if button is clicked
    if(mouseIsPressed) {
      this.selected=true;
    }
  } else {
    this.hover=false;
  }
}