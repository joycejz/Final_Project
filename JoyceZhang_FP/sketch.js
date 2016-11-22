var currPage;
var pages=[];

var rin;
var stars=[];

var mainButtons=[];
var pics0=[];
var mem=[];

var pics2=[];
var env=[];
var drawing;

var looping;

function preload() {
	rin=loadImage('data/rin.png');
	
	for(var i=0; i<10; i++) {
		pics0[i]=loadImage('data/mem'+i+'.jpg');
	}
	
	for (var i=0; i<2; i++) {
	  pics2[i]=loadImage('data/env'+i+'.jpg');
	}
}

function setup() {
	createCanvas(900,600);
	background(65,60,135);
	ellipseMode(CENTER);
	imageMode(CENTER);
	rectMode(CENTER);
	textAlign(CENTER,CENTER);
  
  looping=true;
  
	for(var i=0; i<1000; i++) {
		stars.push(new Star(random(width),random(height),random(1,5)));
	}
	
	pages=["Memories","Present","Shelter"];
	
	for (var i=0; i<pages.length; i++) {
	  mainButtons.push(new MainButton(75+375*i,525,pages[i]));
	}
	
	for (var i=0; i<pics0.length; i++) {
	  mem.push(new Memory(random(200,width-200),-100,random(0.15,0.4),random(2,6),random(-PI/5,PI/5),pics0[i]));
	}
	
	for (var i=0; i<pics2.length; i++) {
	  env.push(new Environment(200*i+150,100,150,100,255,color(255,255,35),pics2[i]));
	}
	
	currPage="Present";
	
	drawing=false;
}

function draw() {
  if(currPage==pages[1]) {
  	background(65,60,135);
  	for(var i=0; i<stars.length; i++) {
  		stars[i].display();
  	}
  	image(rin,width/2,height/4);
    
    
  } else if(currPage==pages[0]) {
    background(215,210,240);
    for (var i=0; i<mem.length; i++) {
      mem[i].ifHover(mouseX,mouseY);
      mem[i].update();
      mem[i].ifSelected();
      mem[i].display();
    }
    
  } else if(currPage==pages[2]) {
    background(0);
    if (drawing) {
      
    } else {
      for(var i=0; i<env.length; i++) {
        env[i].ifHover(mouseX,mouseY);
        env[i].ifSelected();
        env[i].display();
      }
    }
  }
  
  for (var i=0; i<mainButtons.length; i++) {
      mainButtons[i].display();
      mainButtons[i].ifHover(mouseX,mouseY);
      mainButtons[i].mark();
    }
}

function mousePressed() {
  for(var i=0; i<mainButtons.length; i++) {
    var x=mainButtons[i].x;
    var y=mainButtons[i].y;
    if(dist(mouseX,mouseY,x,y)<=20) {
      currPage=pages[i];
      console.log(currPage);
      
      for(var j=0; j<mem.length; j++) {
        mem[j].selected=false;
      }
      
      for(var j=0; j<env.length; j++) {
        env[j].selected=false;
      }
    }
  }
}

function keyPressed() {
  if(key==' ') {
    if(looping) {
      noLoop();
    } else {
      loop();
    }
    looping=!looping;
  }
}