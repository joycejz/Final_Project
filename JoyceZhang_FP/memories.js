//MEMORIES

function Memory(xPos,yPos,s,vel,angle,d,b,p) {
  this.loc=createVector(xPos,yPos);
  this.v=vel;
  this.vel=createVector(0,cos(this.a)*this.v);
  this.s=s;
  this.a=angle;
  this.disp=d;
  this.back=b;
  this.img=p;
  this.hover=false;
  this.selected=false;
  
  //tests if mouse is hovered over memory
  this.ifHover=function(x,y) {
    //calculates distance between mouse and middle of img
    var d=dist(x,y,this.loc.x,this.loc.y)
    //if mouse is within 100 pixels, velocity decreases as mouse gets closer to middle
    if(d<=100) {
      var v=map(d,0,100,0.4,this.v);
      this.vel.y=cos(this.a)*v;
      //mouse is considered to be hovered if it is within 50 pixels
      if(d<=50) {
        this.hover=true;
        //checks if memory is selected
        if(mouseIsPressed) {
          this.selected=true;
          this.hover=false;
          // console.log('select:' +this.selected);
          // console.log('disp:' + this.disp);
          // console.log('hover:' + this.hover);
        }
      } else {
        this.hover=false;
      }
    } else {
      this.vel.y=cos(this.a)*this.v;    //original velocity
    }
  }
  
  //updates location so memory falls
  this.update=function() {
    this.loc.add(this.vel);
    //resets once memory falls off the screen
    if(this.loc.y>height+200) {
      this.reset();
    }
  }
  
  //resets most values randomly
  this.reset=function() {
    this.loc=createVector(random(250,width-250),random(-400,-200));
    this.v=random(3,8);
    this.vel=createVector(0,cos(this.a)*this.v);
    if(this.back) {           //'back' images are smaller
      this.s=random(0.03,0.06);
    } else {
      this.s=random(0.06,0.09);
    }
    this.a=random(-PI/5,PI/5);
    this.disp=!this.disp;     //memories displayed half at a time
    this.hover=false;
    this.selected=false;
  }
  
  this.display=function() {
    if (this.selected) {
      //landscape image
      if (this.img.width>this.img.height) {
        //picture frame
        noStroke();
        fill(200,160,125);
        rect(width/2,height/2-30,700,500);
        fill(175,125,85);
        rect(width/2,height/2-30,660,460);
        fill(190,140,100);
        quad(120,40,120,500,150,470,150,70);
        quad(780,40,780,500,750,470,750,70);
        //picture
        image(this.img,width/2,height/2-30,this.img.width*0.20,this.img.height*0.20);
      //portrait image
      } else {
        //picture frame
        noStroke();
        fill(200,160,125);
        rect(width/2,height/2-30,375,525);
        fill(175,125,85);
        rect(width/2,height/2-30,350,500);
        fill(190,140,100);
        quad(275,20,300,45,300,495,275,520);
        quad(625,20,600,45,600,495,625,520);
        //picture
        image(this.img,width/2,height/2-30,this.img.width*0.15,this.img.height*0.15);
      } 
    //memory page
    } else {
      push();
      translate(this.loc.x,this.loc.y);
      rotate(this.a);
      // if(this.back) {
      //   tint(120,155,165,150);    <-made the program lag a lot...
      // }
      //yellow glow if hovered
      if (this.hover) {
        noStroke();
        fill(255,200,0,127);
        rect(0,0,this.img.width*this.s+10,this.img.height*this.s+10);
      }
      image(this.img,0,0,this.img.width*this.s,this.img.height*this.s);
      //puts a 'filter' over image
      if(this.back) {
        noStroke();
        fill(120,155,165,150);
        rect(0,0,this.img.width*this.s,this.img.height*this.s);
      }
      pop();
    }
  }
}