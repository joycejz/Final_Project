function Memory(xPos,yPos,s,vel,angle,d,b,p) {
  this.loc=createVector(xPos,yPos)
  this.s=s;
  this.a=angle;
  this.v=vel
  this.vel=createVector(0,cos(this.a)*this.v);
  this.disp=d;
  this.back=b;
  this.img=p;
  this.hover=false;
  this.selected=false;
  if(this.img.width>this.img.height) {
    this.exitB=new ExitButton(width/2+315,height/2-245,0,7);
  } else {
    this.exitB=new ExitButton(width/2+160,height/2-265,0,7);
  }
  
  this.ifHover=function(x,y) {
    var d=dist(x,y,this.loc.x,this.loc.y)
    if(d<=100) {
      var v=map(d, 0, 150, 0.4, this.v);
      this.vel.y=cos(this.a)*v;
      if(d<=50) {
        this.hover=true;
        if(mouseIsPressed) {
          this.selected=true;
        }
      } 
    } else {
      this.hover=false;
      this.vel.y=cos(this.a)*this.v;
    }
  }
  
  this.update=function() {
    //this.y+=this.v;
    this.loc.add(this.vel);
    if (this.loc.y>height+100) {
      this.reset();
    }
  }
  
  this.reset=function() {
    this.hover=false;
    this.selected=false;
    // this.loc.x=random(200,width-200);
    // this.loc.y=-100;
    this.loc=createVector(random(250,width-250),-100);
    if(this.back) {
      this.s=random(0.03,0.06);
    } else {
      this.s=random(0.06,0.09);
    }
    this.a=random(-PI/5,PI/5);
    this.v=random(3,6);
    this.vel=createVector(0,cos(this.a)*this.v);
    this.disp=!this.disp;
  }
  
  this.display=function() {
    if(this.back) {
      push();
      translate(this.loc.x,this.loc.y);
      rotate(this.a);
      //tint(120,155,165,150);    <-made the program lag a lot...
      image(this.img,0,0,this.img.width*this.s,this.img.height*this.s);
      noStroke();
      fill(120,155,165,150);
      rect(0,0,this.img.width*this.s,this.img.height*this.s);
      pop();
      //noTint();
    } else if(this.disp) {
      if (this.selected) {
        if (this.img.width>this.img.height) {
          noStroke();
          fill(200,160,125);
          rect(width/2,height/2-30,700,500);
          fill(175,125,85);
          rect(width/2,height/2-30,660,460);
          fill(190,140,100);
          quad(120,40,120,500,150,470,150,70);
          quad(780,40,780,500,750,470,750,70);
          image(this.img,width/2,height/2-30,this.img.width*0.20,this.img.height*0.20);
        } else {
          noStroke();
          fill(200,160,125);
          rect(width/2,height/2-30,375,525);
          fill(175,125,85);
          rect(width/2,height/2-30,350,500);
          fill(190,140,100);
          quad(275,20,300,45,300,495,275,520);
          quad(625,20,600,45,600,495,625,520);
          image(this.img,width/2,height/2-30,this.img.width*0.15,this.img.height*0.15);
        }
        
        this.exitB.ifHover(mouseX,mouseY);
        if (this.exitB.selected) {
          this.hover=false;
          this.selected=false;
          this.vel.y=this.v
          this.exitB.selected=false;
        } else {
          this.exitB.display();
        }
        
      } else {
        push();
        translate(this.loc.x,this.loc.y);
        rotate(this.a);
        if (this.hover) {
          noStroke();
          fill(255,200,0,127);
          rect(0,0,this.img.width*this.s+10,this.img.height*this.s+10);
        }
        image(this.img,0,0,this.img.width*this.s,this.img.height*this.s);
        pop();
      }
    }
  }
}