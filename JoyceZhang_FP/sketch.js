var currPage;
var pages=[];

var rin;

var stars=[];
var numStars=1000;

var mainButtons=[];
var pics0=[];
var mem=[];
var numMem=10;
var memSelected=false;
var selMem;

var pics2=[];
var env=[];
var numEnv=5;
var drawing;
var envSelected=false;
var selEnv;

var looping;

function preload() {
	rin=loadImage('data/rin.png');
	
	for(var i=0; i<numMem; i++) {
		pics0[i]=loadImage('data/mem'+i+'.jpg');
	}
	
	for (var i=0; i<numEnv; i++) {
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
  
	for(var i=0; i<numStars; i++) {
		stars.push(new Star(random(width),random(height),random(1,5)));
	}
	
	pages=["Memories","Present","Shelter","Draw"];
	
	for (var i=0; i<pages.length; i++) {
	  mainButtons.push(new MainButton(75+375*i,550,pages[i]));
	}
	
	for (var i=0; i<pics0.length; i++) {
	  mem.push(new Memory(random(200,width-200),-100,random(0.15,0.4),random(2,6),random(-PI/5,PI/5),pics0[i]));
	}
	
	for (var i=0; i<pics2.length; i++) {
	  env.push(new Environment(200*(i%4)+150,150*floor((i+4)/4)-25,150,100,255,color(255,255,35),pics2[i]));
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
      if (mem[i].selected) {
        memSelected=true;
        selMem=mem[i];
      } else {
        mem[i].display();
      }
    }
    if (memSelected) {
      selMem.display();
    }
    
  } else if(currPage==pages[2]) {
    background(0);
    for(var i=0; i<env.length; i++) {
      env[i].ifHover(mouseX,mouseY);
      env[i].ifSelected();
      if (env[i].selected) {
        selEnv=env[i];
        resetBG();
        currPage=pages[3];
        break;
      } else {
        env[i].display();
      }
    }
  } else if(currPage==pages[3]) {
    selEnv.display();
    if(selEnv.selected==false) {
      currPage=pages[2];
    }
  }
  
  stroke(255);
  strokeWeight(2);
  line(75,550,825,550);
  for (var i=0; i<mainButtons.length; i++) {
    mainButtons[i].display();
    mainButtons[i].ifHover(mouseX,mouseY);
    mainButtons[i].mark();
  }
}

function resetBG() {
  background(0);
}

function reset() {
  for(var j=0; j<mem.length; j++) {
    mem[j].selected=false;
  }
      
  for(var j=0; j<env.length; j++) {
    env[j].selected=false;
  }
      
  memSelected=false;
  envSelected=false;
}

function mousePressed() {
  for(var i=0; i<mainButtons.length; i++) {
    var x=mainButtons[i].x;
    var y=mainButtons[i].y;
    if(dist(mouseX,mouseY,x,y)<=20) {
      currPage=pages[i];
      console.log(currPage);
      
      reset();
      resetBG();
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