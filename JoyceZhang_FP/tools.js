function Tool(xPos,yPos,w,h,col1,col2,col3) {
  this.x=xPos;
  this.y=yPos;
  this.w=w;
  this.h=h;
  this.c1=col1;
  this.c2=col2;
  this.c3=col3;
  this.hover=false;
  this.selected=false;
  
  this.ifHover=function(x,y) {
    if((x>this.x-this.w/2 && x<this.x+this.w/2) && (y>this.y-this.h/2 && y<this.y+this.h/2)) {
      this.hover=true;
      if(mouseIsPressed) {
        this.selected=true;
      }
    } else {
      this.hover=false;
    }
  }
  
  this.display=function() {
    stroke(100);
    strokeWeight(0.5);
    if(this.selected) {
      fill(this.c3);
    } else if (this.hover) {
      fill(this.c2);
    } else {
      fill(this.c1);
    }
    rect(this.x,this.y,this.w,this.h);
  }
}