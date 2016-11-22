function Star(xPos,yPos,w) {
	this.x=xPos
	this.y=yPos
	this.w=w;
	this.a=random(20,255);
	this.brighter=false;
	this.inc=random(1,5);

	this.shine=function() {
		if (this.brighter) {
			this.a+=this.inc;
		} else {
			this.a-=this.inc;
		}
		if (this.a<20 || this.a>255) {
			this.brighter=!this.brighter;
		}
	}

	this.display=function() {
		noStroke();
		this.shine();
		fill(255,255,255,this.a);
		ellipse(this.x,this.y,this.w,this.w);
	}
}