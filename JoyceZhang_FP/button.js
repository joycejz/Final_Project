//BUTTON BASE CLASS
//tried to use inheritance but it didn't work out
//ended up combining all buttons (main, exit, tools) into this code for effiency

function Button(xPos,yPos,w,h,col1,col2,col3,shape,txt,icon) {
  this.x=xPos;
  this.y=yPos;
  this.w=w;
  this.h=h;
  this.c1=col1;
  this.c2=col2;
  this.c3=col3;
  this.shape=shape;
  this.title=txt;
  this.icon=icon;
  this.w2=w+15;
  this.hover=false;
  this.selected=false;
  
  //draws circle around button
  this.mark=function() {
    if (this.hover) {
      stroke(this.c2);
      strokeWeight(1);
      noFill();
      ellipse(this.x,this.y,this.w2,this.w2);
    }
  }
  
  //tests if mouse is hovered over button
  this.ifHover=function(x,y) {
    //calculates distance between mouse and button
    if(dist(x,y,this.x,this.y)<=this.h) {
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
    //circle button
    if(this.shape=='circle') {
      noStroke();
      ellipse(this.x,this.y,this.w,this.h);
    //rectangle button
    } else if (this.shape=='rect') {
      stroke(this.c3);
      strokeWeight(1);
      rect(this.x,this.y,this.w,this.h,3);
    }
    //extra stuff (text and icon)
    text(this.title,this.x,this.y+30);
    if(this.icon!=undefined) {
      image(this.icon,this.x,this.y,this.w,this.h);
    }
  }
}