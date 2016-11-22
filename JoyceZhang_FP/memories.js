function Memory(xPos,yPos,s,vel,angle,p) {
  this.x=xPos;
  this.y=yPos;
  this.s=s;
  this.initialV=vel;
  this.v=this.initialV;
  this.a=angle;
  this.img=p;
  this.hover=false;
  this.selected=false;
  
  this.ifHover=function(x,y) {
    var d=dist(x,y,this.x,this.y)
    if(d<=150) {
      var v=map(d, 0, 150, 0.4, this.initialV);
      this.v=v;
      if(d<=50) {
        this.hover=true;
      } else {
        this.hover=false;
      }
    }
  }
  
  this.ifSelected=function() {
    if(this.hover && mouseIsPressed) {
      this.selected=true;
      console.log(this.selected);
    }
  }
  
  this.update=function() {
    this.y+=this.v;
    if (this.y>height+100) {
      this.reset();
    }
  }
  
  this.reset=function() {
    this.x=random(200,width-200);
    this.y=-100;
    this.s=random(0.15,0.4);
    this.v=random(2,6);
  }
  
  this.display=function() {
    if (this.selected) {
      image(this.img,width/2,height/2);
    } else {
      if (this.hover) {
        noStroke();
        fill(255,200,0,127);
        rect(this.x,this.y,this.img.width*this.s+10,this.img.height*this.s+10);
      }
      image(this.img,this.x,this.y,this.img.width*this.s,this.img.height*this.s);
    }
  }
}