var currPage;
var pages=[];

var space;
var rin;
var ship;

var stars=[];
var numStars=1000;

var hole;
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
var controls=[[],[],[]];
var dd1;
var dd2;
var numTools=5;
var numCtrls=3;
//var stylus;
//var stylusImg;
var drawExitB;
var finish;

var pics3=[];
var sketch=[];
var numSketch=8;

var bgm;
var playB;

var looping;

function preload() {
	rin=loadImage('data/rin.png');
	ship=loadImage('data/ship.png');
	space=loadImage('data/space.jpg');
	
	hole=loadImage('data/hole.jpg');
	for(var i=0; i<numMem; i++) {
		pics0[i]=loadImage('data/mem'+i+'.jpg');
	}
	
	for (var i=0; i<numEnv; i++) {
	  pics2[i]=loadImage('data/env'+i+'.jpg');
	}
	
	for(var i=0; i<numSketch; i++) {
	  pics3[i]=loadImage('data/sketch'+i+'.jpg');
	}
	
	finish=new Tool(150,65,80,20,color(225,215,240),255,color(155,110,200));
	
	//stylusImg=loadImage('data/pencil.png');
	
	bgm=loadSound('assets/bg.mp3');
}

function setup() {
	createCanvas(900,600);
	background(65,60,135);
	ellipseMode(CENTER);
	imageMode(CENTER);
	rectMode(CENTER);
	textAlign(CENTER,CENTER);
  
  looping=true;
  bgm.loop();
  playB=createButton('play/pause');
  playB.position(15,15);
	playB.mousePressed(toggle);
  
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
	  env.push(new Environment(200*(i%4)+150,150*floor((i+4)/4),180,120,255,100,pics3[i],pics2[i]));
	}
	
	for(var i=0; i<numTools; i++) {
	  tools.push(new Tool(70,110+(i*40),25,25,255,color(215,225,230),color(190,200,200)));
	}
	
	for(var i=0; i<numCtrls; i++) {
	  var x=230+(200*i);
	  for (var j=0; j<3; j++) {
	    controls[i].push(new Tool(x+(25*j),65,20,20,255,color(215,225,230),color(190,200,200)));
	  }
	}
	
	dd1=createSelect();
  dd1.position(340,55);
  dd1.size(75,20);
  dd1.option('12.50%');
  dd1.option('25%');
  dd1.option('50%');
  dd1.option('75%');
  dd1.option('100%');
  dd1.option('200%');
  dd1.hide();
    
  dd2=createSelect();
  dd2.position(540,55);
  dd2.size(75,20);
  dd2.option('+00\u00B0');
  dd2.option('+45\u00B0');
  dd2.option('+90\u00B0');
  dd2.option('+180\u00B0');
  dd2.option('-135\u00B0');
  dd2.option('-90\u00B0');
  dd2.option('-45\u00B0');
  dd2.hide();
	
	currPage="Present";
	
	drawing=false;
	
	//stylus=new Stylus(stylusImg)
	
	drawExitB=new ExitButton(840,60,0,5);

}

function draw() {
  if(currPage==pages[1]) {
  	image(space,width/2,height/2);
  	for(var i=0; i<stars.length; i++) {
  		stars[i].display();
  	}
  	image(ship,width/2,height/2-25);
  	image(rin,width/2,height/4);
    
    
  } else if(currPage==pages[0]) {
    image(hole,width/2,height/2);
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
        reset('m',i);
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
      currPage=pages[0];
    }
    
  } else if(currPage==pages[2]) {
    background(160,240,250);
    for(var i=0; i<env.length; i++) {
      env[i].ifHover(mouseX,mouseY);
      if (env[i].selected) {
        selEnv=env[i];
        drawBG();
        currPage=pages[3];
        reset('e',i);
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
        reset('t',i)
      }
    }
    
    dd1.show();
    dd2.show();
    
    for(var i=0; i<controls.length; i++) {
      // fill(255);
      // rect(250+(200*i),65,75,20);
      // fill(100);
      // rect(275+(200*i),65,15,15);
      for(var j=0; j<controls[i].length; j++) {
        controls[i][j].ifHover(mouseX,mouseY);
        controls[i][j].display();
        if(controls[i][j].selected==true) {
          reset('c',-1)
        }
      }
    }
    finish.ifHover(mouseX,mouseY);
    finish.display();
    fill(50);
    noStroke();
    text('Finish',finish.x,finish.y);
    
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
      finish.selected=false;
      reset('all',-1);
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

function drawBG() {
  noStroke();
  fill(230);
  rect(width/2,height/2-25,800,450)
  fill(200)
  rect(width/2+20,height/2-10,600,400)
  fill(190,170,235);
  rect(470,65,760,30)
  rect(70,height/2-25,40,450)
}

function reset(type,num) {
  if(type=='c'){
    for(var i=0; i<controls.length; i++) {
      for(var j=0; j<controls[i].length; j++) {
        controls[i][j].selected=false;
      }
    }
  }else if(type=='t') {
    for(var i=0; i<tools.length; i++) {
      if(i!=num) {
        tools[i].selected=false;
      }
    }
  }else if(type=='m') {
    for(var j=0; j<mem.length; j++) {
      if(j!=num) {
        mem[j].selected=false;
      }
    }
  } else if(type=='e') {
    for(var j=0; j<env.length; j++) {
      if(j!=num) {
        env[j].selected=false;
      }
    }
  } else if(type=='all') {
    for(var i=0; i<tools.length; i++) {
      tools[i].selected=false;
    }
    for(var j=0; j<mem.length; j++) {
      mem[j].selected=false;
    }
    for(var j=0; j<env.length; j++) {
      env[j].selected=false;
    }
    memSelected=false;
    envSelected=false;
    dd1.hide();
    dd2.hide();
  }
}

function toggle() {
  if(bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.play();
  }
}

function mousePressed() {
  for(var i=0; i<mainButtons.length; i++) {
    var x=mainButtons[i].x;
    var y=mainButtons[i].y;
    if(dist(mouseX,mouseY,x,y)<=20) {
      currPage=pages[i];
      console.log(currPage);
      reset('all',-1);
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