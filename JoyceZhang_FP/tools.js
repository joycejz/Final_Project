//DRAWING TOOLS

function Tool(xPos,yPos,w,h,col1,col2,col3,icon) {
  this.x=xPos;
  this.y=yPos;
  this.w=w;
  this.h=h;
  this.c1=col1;
  this.c2=col2;
  this.c3=col3;
  this.icon=icon;
  this.hover=false;
  this.selected=false;
  
  //tests if mouse is hovered over button
  this.ifHover=function(x,y) {
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
  
  this.display=function() {
    stroke(100);
    strokeWeight(0.5);
    //if button is clicked, color3
    if(this.selected) {
      fill(this.c3);
    //if button is hovered, color2
    } else if (this.hover) {
      fill(this.c2);
    //if nothing happens to button, color1
    } else {
      fill(this.c1);
    }
    rect(this.x,this.y,this.w,this.h);
    if(icon!=undefined) {
      image(this.icon,this.x,this.y,this.w,this.h);
    }
  }
}