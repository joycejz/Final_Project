//STARS

function Star(xPos,yPos,w) {
	this.x=xPos
	this.y=yPos
	this.w=w;
	this.a=random(20,255);
	this.brighter=false;
	this.inc=random(1,5);
  
  //makes star flash on and off
	this.shine=function() {
		if (this.brighter) {
			this.a+=this.inc;   //gets brighter
		} else {
			this.a-=this.inc;   //gets dimmer
		}
		//switch between brighter and dimmer
		if (this.a<20 || this.a>255) {
			this.brighter=!this.brighter;
		}
	}

	this.display=function() {
		noStroke();
		fill(255,255,255,this.a);
		ellipse(this.x,this.y,this.w,this.w);
	}
}