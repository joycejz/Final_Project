function Stylus(img) {
  this.x=0;
  this.y=0;
  this.img=img;
  
  this.update=function() {
    this.x=mouseX+75;
    this.y=mouseY-75;
  }
  
  this.display=function() {
    image(img,this.x,this.y)
  }
}