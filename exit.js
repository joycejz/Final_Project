//EXIT BUTTON
// "X" button to 'close' objects/

function ExitButton(xPos,yPos,col,size) {
  this.x=xPos;
  this.y=yPos;
  this.c=col;
  this.s=size;
  this.hover=false;
  this.selected=false;
  
  //tests if mouse is hovered over button
  this.ifHover=function(x,y) {
    //calculates distance between mouse and button
    if(dist(x,y,this.x,this.y)<=20) {
      this.hover=true;
      //tests if button is clicked
      if(mouseIsPressed) {
        this.selected=true;
      }
    } else {
      this.hover=false;
    }
  }
  
  //draws "X"
  this.display=function() {
    stroke(this.c);
    strokeWeight(4);
    line(this.x-this.s,this.y-this.s,this.x+this.s,this.y+this.s);
    line(this.x+this.s,this.y-this.s,this.x-this.s,this.y+this.s);
  }
}