var currPage;
var pages=[];

var rin;
var ship;

var stars=[];
var numStars=1000;

var mainButtons=[];
var pics0=[];
var mem=[];
var memBack=[];
var numMem=10;
var memSelected=false;
var selMem;

var pics2=[];
var env=[];
var numEnv=8;
var drawing;
var envSelected=false;
var selEnv;

var tools=[];
var controls=[];
var numTools=5;
var numCtrls=3;
//var stylus;
//var stylusImg;
var drawExitB;

var pics3=[];
var sketch=[];
var numSketch=8;

var bg;

var looping;

function preload() {
	rin=loadImage('data/rin.png');
	ship=loadImage('data/ship.png');
	
	for(var i=0; i<numMem; i++) {
		pics0[i]=loadImage('data/mem'+i+'.jpg');
	}
	
	for (var i=0; i<numEnv; i++) {
	  pics2[i]=loadImage('data/env'+i+'.jpg');
	}
	
	for(var i=0; i<numSketch; i++) {
	  pics3[i]=loadImage('data/sketch'+i+'.jpg');
	}
	
	//stylusImg=loadImage('data/pencil.png');
	
	bg=loadSound('assets/bg.mp3');
}

function setup() {
	createCanvas(900,600);
	background(65,60,135);
	ellipseMode(CENTER);
	imageMode(CENTER);
	rectMode(CENTER);
	textAlign(CENTER,CENTER);
  
  looping=true;
  bg.loop();
  
	for(var i=0; i<numStars; i++) {
		stars.push(new Star(random(width),random(height),random(1,5)));
	}
	
	pages=["Memories","Present","Shelter","Draw","Mem"];
	
	for (var i=0; i<pages.length; i++) {
	  mainButtons.push(new MainButton(75+375*i,550,pages[i]));
	}
	
	for (var i=0; i<pics0.length; i++) {
	  if(i<pics0.length/2) {
	    mem.push(new Memory(random(250,width-250),random(-500,-100),random(0.06,0.09),random(3,6),random(-PI/5,PI/5),true,false,pics0[i]));
	    memBack.push(new Memory(random(200,width-200),random(-500,-100),random(0.03,0.06),random(3,6),random(-PI/5,PI/5),false,true,pics0[i]));
	  } else {
	    mem.push(new Memory(random(200,width-200),random(-500,-100),random(0.06,0.09),random(3,6),random(-PI/5,PI/5),false,false,pics0[i]));
	    memBack.push(new Memory(random(200,width-200),random(-500,-100),random(0.04,0.06),random(3,6),random(-PI/5,PI/5),true,true,pics0[i]));
	  }
	}
	
	for (var i=0; i<pics2.length; i++) {
	  env.push(new Environment(200*(i%4)+150,150*floor((i+4)/4)-25,150,100,255,color(255,255,35),pics3[i],pics2[i]));
	}
	
	for(var i=0; i<numTools; i++) {
	  tools.push(new Tool(70,110+(i*40),25,255,color(215,225,230),color(190,200,200)));
	}
	
	for(var i=0; i<numCtrls; i++) {
	  var x=310+(200*i);
	  for (var j=0; j<3; j++) {
	    controls[i].push(new Tool(x+(30*j),65,20,255,color(215,225,230),color(190,200,200)));
	  }
	}
	
	currPage="Present";
	
	drawing=false;
	
	//stylus=new Stylus(stylusImg)
	
	drawExitB=new ExitButton(840,60,0,5);

}

function draw() {
  if(currPage==pages[1]) {
  	background(65,60,135);
  	for(var i=0; i<stars.length; i++) {
  		stars[i].display();
  	}
  	image(ship,width/2,height/2-25);
  	image(rin,width/2,height/4);
    
    
  } else if(currPage==pages[0]) {
    background(215,210,240);
    for (var i=0; i<memBack.length;i++) {
      memBack[i].update();
      memBack[i].display();
    }
    for (var i=0; i<mem.length; i++) {
      mem[i].ifHover(mouseX,mouseY);
      mem[i].update();
      if (mem[i].selected) {
        memSelected=true;
        selMem=mem[i];
        currPage=pages[4];
        resetMem(i);
        resetBG();
        break;
      } else {
        mem[i].display();
      }
    }
  } else if(currPage==pages[4]) {
    background(215,210,240);
    selMem.display();
    if(selMem.selected==false) {
      reset();
      resetBG();
      currPage=pages[0];
    }
    
  } else if(currPage==pages[2]) {
    background(0);
    for(var i=0; i<env.length; i++) {
      env[i].ifHover(mouseX,mouseY);
      if (env[i].selected) {
        selEnv=env[i];
        currPage=pages[3];
        resetEnv(i);
        resetBG();
        break;
      } else {
        env[i].display();
      }
    }
    
  } else if(currPage==pages[3]) {
    
    drawExitB.ifHover(mouseX,mouseY);
    if(drawExitB.selected) {
      selEnv.reset();
      drawExitB.selected=false;
    } else {
      drawExitB.display();
    }
    
    for(var i=0; i<tools.length; i++) {
      tools[i].ifHover(mouseX,mouseY);
      tools[i].display();
      if(tools[i].selected==true) {
        resetTools(i)
      }
    }
    
    for(var i=0; i<controls.length; i++) {
      for(var j=0; j<controls[i].length; j++) {
        tools[i][j].ifHover(mouseX,mouseY);
        tools[i][j].display();
        if(tools[i][j].selected==true) {
          resetCtrls(i,j)
        }
      }
    }
    
    var finish=new Tool(150,65,20,0,50,100);
    finish.ifHover(mouseX,mouseY);
    finish.display();
    
    // if((mouseX>90 && mouseX<width-50) && (mouseY>50 && mouseY<height-100)) {
    //   stylus.update();
    //   stylus.display()
    // }
    
    if(finish.selected) {
      selEnv.sketch=false;
    }
    selEnv.update();
    selEnv.display();
    if(selEnv.selected==false) {
      reset();
      resetBG();
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
  if(currPage==pages[3]) {
    noStroke();
    fill(230);
    rect(width/2,height/2-25,800,450)
    fill(200)
    rect(width/2+20,height/2-10,600,400)
    fill(190,170,235);
    rect(470,65,760,30)
    rect(70,height/2-25,40,450)
  } else if(currPage==pages[4]) {
    background(215,210,240);
  }else {
    background(0);
  }
}

function resetCtrls(c1,c2) {
  for(var i=0; i<controls.length; i++) {
    for(var j=0; j<controls[i].length; j++) {
      if(c1!=i && c2!=j) {
        controls[i][j].selected=false;
      }
    }
  }
}

function resetTools(t) {
  for(var i=0; i<tools.length; i++) {
    if(i!=t) {
      tools[i].selected=false;
    }
  }
}

function resetMem(m) {
  for(var j=0; j<mem.length; j++) {
    if(j!=m) {
      mem[j].selected=false;
    }
  }
}

function resetEnv(e) {
  for(var j=0; j<env.length; j++) {
    if(j!=e) {
      env[j].selected=false;
    }
  }
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
      
      resetTools();
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