function ExitButton(xPos,yPos,col) {
  this.x=xPos;
  this.y=yPos;
  this.c=col;
  this.hover=false;
  this.selected=false;
  
  this.ifHover=function(x,y) {
    if(dist(x,y,this.x,this.y)<=20) {
      this.hover=true;
    } else {
      this.hover=false;
    }
  }
  
  this.ifSelected=function() {
    if(this.hover && mouseIsPressed) {
      this.selected=true;
    }
  }
  
  this.display=function() {
    stroke(this.c);
    if (this.hover) {
      strokeWeight(8);
    } else {
      strokeWeight(5);
    }
    line(this.x-10,this.y-10,this.x+10,this.y+10);
    line(this.x+10,this.y-10,this.x-10,this.y+10);
  }
}