function Environment(xPos,yPos,iWidth,iHeight,col,hCol,img) {
  this.x=xPos;
  this.y=yPos;
  this.w=iWidth;
  this.h=iHeight;
  this.c=col;
  this.c2=hCol;
  this.img=img;
  this.hover=false;
  this.selected=false;
  
  this.ifHover=function(x,y) {
    if((abs(x-this.x)<=this.w/2) && (abs(y-this.y)<=this.h/2)) {
      this.hover=true;
    } else {
      this.hover=false;
    }
  }
  
  this.ifSelected=function() {
    if(this.hover && mouseIsPressed) {
      this.selected=true;
      console.log(this.selected);
    }
  }
  
  this.display=function() {
    if (this.selected) {
      image(this.img,width/2,height/2);
      
    } else {
      image(this.img,this.x,this.y,this.w,this.h);
      if (this.hover) {
        stroke(this.c2);
      } else {
        stroke(this.c);
      }
      noFill();
      strokeWeight(5);
      rect(this.x,this.y,this.w+5,this.h+5,10);
    }
  }
}