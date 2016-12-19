//JOYCE ZHANG
//CREATIVE CODING FALL 2016

//CREDITS:
//Based off - Shelter by Porter Robinson & Madeon (https://www.youtube.com/watch?v=HQnC1UHBvWA)
//Video - A-1 Pictures & Crunchyroll (https://www.youtube.com/watch?v=fzQ6gRAEoy0)
//BGM - Lily Hu



//MAIN CODE

var font;

//keeps track of pages
var currPage;
var pages=[];
var mainButtons=[];

//background music
var bgm;
var bgmCtrls=[];
var numBgmCtrls=2;
var playB;

//video clips
var vids=[];
numVids=3;

//exit buttons
var exitB=[];
numExitB=2;

//present
var space;
var rin;
var ship;
var stars=[];
var numStars=1000;

//memories
var hole;
var pics0=[];
var mem=[];
var memBack=[];
var numMem=10;
var my0=800;
var my1=1000;
var my2=1200;
//picture frame
var selMem;
var picExitB1;
var picExitB2;

//shelter
var pics2=[];
var env=[];
var numEnv=9;
//drawing program
var drawing;
var selEnv;
var panel;
var pics3=[];
var sketch=[];
var bCtrlPics=[];
var bCtrls=[];
var numSketch=9;
var numBCtrls=2;
var drawExitB;
var finish;

//for pausing/running the program
var looping;

function preload() {
  font=loadFont('data/font.ttf');
  
  //bg music
	bgm=loadSound('data/bgm.mp3');
	for (var i=0; i<numBgmCtrls; i++) {
	  bgmCtrls[i]=loadImage('data/music'+i+'.png');
	}
  
  //videos
  for(var i=0; i<numVids; i++) {
    vids[i]=createVideo('data/vid'+i+'.mp4');
    vids[i].size(900,506);
    vids[i].hide()
  }
  
  //exit button
  for (var i=0; i<numExitB; i++) {
    exitB[i]=loadImage('data/x'+i+'.png');
  }
  
  //present
	rin=loadImage('data/rin.png');
	ship=loadImage('data/ship.png');
	space=loadImage('data/space.jpg');
	
	//memories
	hole=loadImage('data/hole.jpg');
	for(var i=0; i<numMem; i++) {
		pics0[i]=loadImage('data/mem'+i+'.jpg');
	}
	
	//shelter
	for (var i=0; i<numEnv; i++) {
	  pics2[i]=loadImage('data/env'+i+'.jpg');
	}
	for(var i=0; i<numSketch; i++) {
	  pics3[i]=loadImage('data/sketch'+i+'.jpg');
	}
	//draw
	panel=loadImage('data/panel.png');
  for(var i=0; i<numBCtrls; i++) {
    bCtrlPics[i]=loadImage('data/brush'+i+'.png');
  }
}

function setup() {
	createCanvas(900,600);
	ellipseMode(CENTER);
	imageMode(CENTER);
	rectMode(CENTER);
	textAlign(CENTER);
	textFont(font);
	textSize(20);
  
  //keeps track of pages
  pages=["Picture","Memories","Present","Shelter","Draw"];
  for (var i=1; i<pages.length-1; i++) {
	  mainButtons.push(new Button(75+375*(i-1),550,20,20,255,255,255,'circle',pages[i]));
	}
//   //pause/play button
  playB=new Button(30,30,30,30,255,255,255,'circle','',bgmCtrls[0]);
  
  //present
	for(var i=0; i<numStars; i++) {
		stars.push(new Star(random(width),random(height),random(1,5)));
	}
	
	//memories
	//split to create 3d effect
	//split so that only half of the pictures fall at a time
	for (var i=0; i<pics0.length; i++) {
	  if(i<pics0.length/2) {
	    mem.push(new Memory(random(200,width-200),random(-500,-100),random(0.07,0.1),random(3,8),random(-PI/5,PI/5),true,false,pics0[i]));   //front
	    memBack.push(new Memory(random(200,width-200),random(-500,-100),random(0.03,0.07),random(3,8),random(-PI/5,PI/5),false,true,pics0[i]));   //back
	  } else {
	    mem.push(new Memory(random(200,width-200),random(-500,-100),random(0.07,0.1),random(3,8),random(-PI/5,PI/5),false,false,pics0[i]));    //front
	    memBack.push(new Memory(random(200,width-200),random(-500,-100),random(0.03,0.07),random(3,8),random(-PI/5,PI/5),true,true,pics0[i]));    //back
	  }
	}
	
	//exit buttons for pictures
	picExitB1=new Button(width/2+315,height/2-245,20,20,color(255,0),color(255,0),color(255,0),'circle','',exitB[0]);
	picExitB2=new Button(width/2+160,height/2-265,20,20,color(255,0),color(255,0),color(255,0),'circle','',exitB[0])
	
	//shelter
  for (var i=0; i<pics2.length; i++) {
	  env.push(new Environment(225*(i%3)+225,135*floor((i+3)/3)+7,180,120,255,color(185,230,240),pics3[i],pics2[i]));
	}

	//draw
	finish=new Button(125,height/2-25,70,30,color(255),color(225,215,240),color(145,120,185),'rect','');
	for (var i=0; i<bCtrlPics.length; i++) {
	  bCtrls.push(new Button(125,225+(i*100),30,30,color(255),color(185,230,240),color(120,203,230),'rect','',bCtrlPics[i]));
	}
	
	drawing=false;
	drawExitB=new Button(790,85,20,20,color(255,0),color(255,0),color(255,0),'circle','',exitB[1])
	
	//for pausing/running program
  looping=true;
  
  background(0);
  
  //start
  currPage="Intro";
}

function draw() {
  
  //INTRO PAGE
  if(currPage=='Intro') {
    playVid(vids[1],pages[2])   //intro vid
    
  //PRESENT PAGE
  } else if(currPage==pages[2]) {
    
  	image(space,width/2,height/2);    //space background
  	for(var i=0; i<stars.length; i++) {
  	  stars[i].shine();
  		stars[i].display();
  	}
  	image(ship,width/2,height/2-25);
  	image(rin,width/2,height/4);
    
  //MEMORIES PAGE
  } else if(currPage==pages[1]) {
    image(hole,width/2,height/2);     //falling background
    
    //back of ellipses
    stroke(195,130,205);
    strokeWeight(6);
    noFill();
    push();
    translate(width/2,my0);
    rotate(PI/8);
    arc(-10,0,700,200,PI,TWO_PI);
    pop();
    my0-=2;
    if(my0<-200){
      my0=800;
    }
    
    push();
    translate(width/2,my2);
    rotate(-PI/9);
    arc(-40,0,700,175,PI,TWO_PI);
    pop();
    my2-=2;
    if(my2<-200){
      my2=800;
    }
    
    strokeWeight(8);
    push();
    translate(width/2,my1);
    rotate(PI/15);
    arc(20,0,800,300,PI,TWO_PI);
    pop();
    my1-=2;
    if(my1<-200){
      my1=800;
    }
    
    //'back' memories
    for (var i=0; i<memBack.length; i++) {
      memBack[i].update();
      if(memBack[i].disp) {
        memBack[i].display(); 
      }
    }
    //interactive memories
    for (var i=0; i<mem.length; i++) {
      mem[i].update();
      if(mem[i].disp) {
        mem[i].ifHover(mouseX,mouseY);
        if (mem[i].selected) {
          selMem=mem[i];
          currPage=pages[0];    //go to picture page
          reset('m',i);         //'turns off' other memories
          break;                //exits for loop
        } else {
          mem[i].display();
        }
      }
    }
    
    //front of ellipses
    stroke(240,155,255);
    strokeWeight(7);
    noFill();
    push();
    translate(width/2,my0);
    rotate(PI/8);
    arc(-10,0,700,200,0,PI);
    pop();
    my0-=2;
    if(my0<-200){
      my0=800;
    }
    
    push();
    translate(width/2,my2);
    rotate(-PI/9);
    arc(-40,0,700,175,0,PI);
    pop();
    my2-=2;
    if(my2<-200){
      my2=800;
    }
    
    strokeWeight(9);
    push();
    translate(width/2,my1);
    rotate(PI/15);
    arc(20,0,800,300,0,PI);
    pop();
    my1-=2;
    if(my1<-200){
      my1=800;
    }
    
  //PICTURE PAGE
  } else if(currPage==pages[0]) {
    background(215,210,240);
    selMem.display();
    
    //exit button
    //for landscape image
    if(selMem.img.width>selMem.img.height) {
      picExitB1.ifHover(mouseX,mouseY);
      if(picExitB1.selected) {
        selMem.selected=false;         //reset memory on exit
        picExitB1.selected=false;
        currPage=pages[1];
      } else {
        picExitB1.display();
      }
    //for portrait image
    } else {
      picExitB2.ifHover(mouseX,mouseY);
      if(picExitB2.selected) {
        selMem.selected=false;         //reset memory on exit
        picExitB2.selected=false;
        currPage=pages[1];
      } else {
        picExitB2.display();
      }
    }
  
  //SHELTER PAGE
  } else if(currPage==pages[3]) {
    image(space,width/2,height/2);    //space background
    for(var i=0; i<stars.length; i++) {
      stars[i].shine();
    	stars[i].display();
    }
    image(panel,width/2,height/2-25);
    
    //shows environment choices
    for(var i=0; i<env.length; i++) {
      env[i].ifHover(mouseX,mouseY);
      //if an environment is picked
      if(env[i].selected) {
        selEnv=env[i];
        drawBG();       //set up drawing bg
        currPage=pages[4];    //go to drawing page
        reset('e',i);   //'turns off' other environments
        break;          //exit for loop
      } else {
        env[i].display();
      }
    }
    
    //OLD ONE BY ONE CODE
    // if (currEnv>0) {
    //   left.ifHover(mouseX,mouseY);
    //   left.display();
    //   stroke(0);
    //   strokeWeight(3);
    //   noFill();
    //   line(left.x-10,left.y,left.x+10,left.y-10);
    //   line(left.x-10,left.y,left.x+10,left.y+10);
    //   if(left.selected) {
    //     currEnv--;
    //     wait(1);
    //     left.selected=false;
    //   }
    // }
    // if (currEnv<env.length-1) {
    //   right.ifHover(mouseX,mouseY);
    //   right.display();
    //   stroke(0);
    //   strokeWeight(3);
    //   noFill();
    //   line(right.x+10,right.y,right.x-10,right.y-10);
    //   line(right.x+10,right.y,right.x-10,right.y+10);
    //   if(right.selected){
    //     currEnv++;
    //     wait(1);
    //     right.selected=false;
    //   }
    // }
    // env[currEnv].ifHover(mouseX,mouseY);
    // if (env[currEnv].selected) {
    //   selEnv=env[currEnv];
    //   drawBG();             //set up 'drawing program'
    //   currPage=pages[4];    //go to draw page
    //   reset('e',currEnv);         //'turns off' other environments
    // } else {
    //   env[currEnv].display();
    // }
    
  //DRAW PAGE
  } else if(currPage==pages[4]) {
    //exit button
    drawExitB.ifHover(mouseX,mouseY);
    if(drawExitB.selected) {
      selEnv.reset();         //reset environment on exit
      drawExitB.selected=false;
    } else {
      drawExitB.display();
    }
    //finish button
    finish.ifHover(mouseX,mouseY);
    finish.display();
    fill(50);
    noStroke();
    text('Finish',finish.x,finish.y+5);
    if(finish.selected) {
      selEnv.sketch=false;    //transition to reveal image
    }
    //brush controls
    for(var i=0;i<bCtrls.length; i++) {
      bCtrls[i].ifHover(mouseX,mouseY);
      bCtrls[i].display();
      if(bCtrls[i].selected) {
        selEnv.brushSize(i);
        wait(1);
        bCtrls[i].selected=false;
      }
    }

    //displays sketch/image
    selEnv.display();
    if(selEnv.selected==false) {
      finish.selected=false;    //reset finish button
      selEnv.sketch=true;       //next time environment is selected, have to start at sketch again
      reset('all',-1);          //reset all components
      currPage=pages[3];        //go back to 'shelter' page
    }
  }
  
  //MAIN BUTTONS
  for (var i=0; i<mainButtons.length; i++) {
    mainButtons[i].ifHover(mouseX,mouseY);
    mainButtons[i].mark();
    //mainButtons[i].display();
    if(mainButtons[i].selected) {
      if (i+1==1) {
        playVid(vids[i],pages[i+1]);
      } else if (i+1==3) {
        playVid(vids[i],pages[i+1]);
      } else if (i+1==2) {
        currPage=pages[i+1];
        reset('all',-1);
      }
    }
  }
  stroke(255);
  strokeWeight(2);
  line(75,550,825,550);
  for (var i=0; i<mainButtons.length; i++) {
    mainButtons[i].display();
  }
  //play/pause button
  playB.ifHover(mouseX,mouseY);
  playB.mark();
  playB.display();
}

//sets up 'drawing' page
function drawBG() {
  image(space,width/2,height/2);    //space background
  for(var i=0; i<stars.length; i++) {
    stars[i].shine();
  	stars[i].display();
  }
  image(panel,width/2,height/2-25);
  noStroke();
  fill(255,100);
  rect(width/2+15,height/2-22,600,400);
}

function playVid(vid,dest) {
  background(0);
  image(vid,width/2,height/2);
  vid.play();
  //console.log(vid.time()+'/'+vid.duration())
  if (vid.duration()-vid.time() < 0.2) {
    currPage=dest;
    if(dest==pages[2]) {
      bgm.loop()
      playB.icon=bgmCtrls[1];
    }
    vid.time(0);
    vid.pause();
    reset('all',-1);          //reset everything when page changes
  }
  
}

//resets certain or all components
//can choose one of each to not reset
//if want to reset all, set num=-1
function reset(type,num,num2) {
  if(num2===undefined) {
    num2=null;
  }
  //reset memories
  if(type=='m') {
    for(var j=0; j<mem.length; j++) {
      if(j!=num) {
        mem[j].selected=false;
      }
    }
  //reset environments
  } else if(type=='e') {
    for(var k=0; j<env.length; k++) {
      if(k!=num) {
        env[k].selected=false;
      }
    }
  //reset all components
  } else if(type=='all') {
    for(var j=0; j<mem.length; j++) {
      mem[j].reset();
    }
    for(var k=0; k<memBack.length; k++) {
      memBack[k].reset();
    } 
    for(var l=0; l<env.length; l++) {
      env[l].reset();
    }
    for(var m=0; m<mainButtons.length; m++) {
      mainButtons[m].selected=false;
    }
    playB.selected=false;
    my0=800;
    my1=1000;
    my2=1200;
  }
}

//pause/play bg music
function toggleBGM() {
  if(bgm.isPlaying()) {
    bgm.pause();
    playB.icon=bgmCtrls[0];
  } else {
    bgm.play();
    playB.icon=bgmCtrls[1];
  }
}

function mousePressed() {
  if(playB.hover) {
    toggleBGM();
    //playB.selected=false;
  }
}

//pauses/runs program when 'spacebar' is pressed
//for coding/debugging purposes
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

//wait for s seconds
function wait(s) {
  var start=second();
  var end=start;
  while(end!=((start+s)%60)) {
    end=second();
  }
}