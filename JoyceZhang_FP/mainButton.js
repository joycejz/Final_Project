//MENU BUTTON (at bottom of screen)

function MainButton(xPos,yPos,txt) {
  this.x=xPos;
  this.y=yPos;
  this.title=txt;
  this.w=20;
  this.w2=35;
  this.hover=false;
  
  //draws circle around button
  this.mark=function() {
    if (this.hover) {
      stroke(255);
      strokeWeight(1);
      noFill();
      ellipse(this.x,this.y,this.w2,this.w2);
    }
  }
  
  //tests if mouse is hovered over button
  this.ifHover=function(x,y) {
    //calculates distance between mouse and button
    if(dist(x,y,this.x,this.y)<=20) {
      this.hover=true;
    } else {
      this.hover=false;
    }
  }
  
  this.display=function() {
    noStroke();
    fill(255);
    ellipse(this.x,this.y,this.w,this.w);
    text(this.title,this.x,this.y+30);
  }
}