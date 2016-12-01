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
  this.gl=520;
  this.exitB=new ExitButton(width/2+this.img.width/2-65,height/2-this.img.height/2+20,255);
  
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
      noStroke();
      fill(0);
      //rect(width/2,height/2,width,height);
      noFill();
      stroke(255);
      rect(width/2,height/2-30,this.img.width,this.img.height);
      //copy(this.img,mouseX-85,mouseY-30,30,30,mouseX-10,mouseY-10,30,30);
      if(this.gl>-20) {
        var px1=random(0,width);
        var py1=random(this.gl-20,this.gl+20);
        var pw1=random(20,50);
        var ph1=random(20,50);
        copy(this.img,px1-75,py1-20,pw1,ph1,px1,py1,pw1,ph1);
        var px2=random(0,width);
        var py2=random(this.gl-30,this.gl-70);
        var pw2=random(5,15);
        var ph2=random(5,15);
        copy(this.img,px2-75,py2-20,pw2,ph2,px2,py2,pw2,ph2);
        if(second()%1==0) {
          this.gl-=0.5;
        }
      } else {
        image(this.img,width/2,height/2-30);
      }
      
      this.exitB.ifHover(mouseX,mouseY);
      this.exitB.ifSelected();
      if (this.exitB.selected) {
        this.selected=false;
      } else {
        this.exitB.display();
      }
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