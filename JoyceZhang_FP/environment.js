function Environment(xPos,yPos,iWidth,iHeight,col,hCol,imgS,img) {
  this.x=xPos;
  this.y=yPos;
  this.w=iWidth;
  this.h=iHeight;
  this.c=col;
  this.c2=hCol;
  this.imgS=imgS;
  this.img=img;
  this.sketch=true;
  this.hover=false;
  this.selected=false;
  this.brush=30;
  this.gl=500;
  //this.exitB=new ExitButton(width/2+this.img.width/2-65,height/2-this.img.height/2+20,255);
  
  this.ifHover=function(x,y) {
    if((abs(x-this.x)<=this.w/2) && (abs(y-this.y)<=this.h/2)) {
      this.hover=true;
      if(mouseIsPressed) {
        this.selected=true;
      }
    } else {
      this.hover=false;
    }
  }
  
  this.update=function() {
    if(keyIsPressed) {
      if(key==='[') {
        this.brush-=3;
      } else if(key===']') {
        this.brush+=3;
      }
    }
  }
  
  this.reset=function() {
    this.selected=false;
    this.sketch=true;
    this.hover=false;
    this.selected=false;
    this.brush=30;
    this.gl=500;
  }
  
  this.display=function() {
    if (this.selected) {
      if(this.sketch) {
        copy(this.imgS,mouseX-180,mouseY-100,this.brush,this.brush,mouseX-10,mouseY-10,this.brush,this.brush);
      } else {
        if(this.gl>50) {
          var px1=random(0,width);
          var py1=random(this.gl-20,this.gl+20);
          var pw1=random(25,55);
          var ph1=random(25,55);
          copy(this.img,px1-170,py1-90,pw1,ph1,px1,py1,pw1,ph1);
          var px2=random(0,width);
          var py2=random(this.gl-30,this.gl-70);
          var pw2=random(5,15);
          var ph2=random(5,15);
          copy(this.img,px2-170,py2-90,pw2,ph2,px2,py2,pw2,ph2);
          if(second()%1==0) {
            this.gl-=0.3;
          }
        } else {
          image(this.img,width/2+20,height/2-10);
        }
      }
    } else {
      image(this.img,this.x,this.y,this.w,this.h);
      if (this.hover) {
        stroke(this.c2);
      } else {
        stroke(this.c);
      }
      noFill();
      strokeWeight(3);
      rect(this.x,this.y,this.w,this.h,3);
    }
  }
}