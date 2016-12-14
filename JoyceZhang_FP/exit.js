function ExitButton(xPos,yPos,col,size) {
  this.x=xPos;
  this.y=yPos;
  this.c=col;
  this.s=size;
  this.hover=false;
  this.selected=false;
  
  this.ifHover=function(x,y) {
    if(dist(x,y,this.x,this.y)<=20) {
      this.hover=true;
      if(mouseIsPressed) {
        this.selected=true;
      }
    } else {
      this.hover=false;
    }
  }
  
  this.display=function() {
    stroke(this.c);
    strokeWeight(4);
    line(this.x-this.s,this.y-this.s,this.x+this.s,this.y+this.s);
    line(this.x+this.s,this.y-this.s,this.x-this.s,this.y+this.s);
  }
}