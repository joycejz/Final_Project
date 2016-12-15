//MAIN CODE

//keeps track of pages
var currPage;
var pages=[];
var mainButtons=[];

//background music
var bgm;
var playB;

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
//picture frame
var selMem;
var picExitB1;
var picExitB2;

//shelter
var pics2=[];
var env=[];
var numEnv=8;
var currEnv;
var left;
var right;
//drawing program
var drawing;
var selEnv;
var pics3=[];
var sketch=[];
var tools=[];
var controls=[[],[],[]];
var numSketch=8;
var numTools=5;
var numCtrls=3;
var drawExitB;
var finish;
var dd1;
var dd2;
//var stylus;
//var stylusImg;

//for pausing/running the program
var looping;

function preload() {
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
	finish=new Tool(150,65,80,20,color(225,215,240),255,color(155,110,200));
	//stylusImg=loadImage('data/pencil.png');
	
	//bg music
	bgm=loadSound('assets/bgm.mp3');
}

function setup() {
	createCanvas(900,600);
	background(65,60,135);
	ellipseMode(CENTER);
	imageMode(CENTER);
	rectMode(CENTER);
	textAlign(CENTER,CENTER);
  
  //keeps track of pages
  pages=["Picture","Memories","Present","Shelter","Draw"];
  for (var i=1; i<pages.length-1; i++) {
	  mainButtons.push(new MainButton(75+375*(i-1),550,pages[i]));
	}
	currPage="Present";
  
  //bg music
  bgm.loop();
  //pause/play button
  playB=createButton('play/pause');
  playB.position(15,15);
	playB.mousePressed(toggle);
  
  //present
	for(var i=0; i<numStars; i++) {
		stars.push(new Star(random(width),random(height),random(1,5)));
	}
	
	//memories
	//split to create 3d effect
	//split so that only half of the pictures fall at a time
	for (var i=0; i<pics0.length; i++) {
	  if(i<pics0.length/2) {
	    mem.push(new Memory(random(200,width-200),random(-500,-100),random(0.07,0.1),random(3,7),random(-PI/5,PI/5),true,false,pics0[i]));   //front
	    memBack.push(new Memory(random(200,width-200),random(-500,-100),random(0.03,0.07),random(3,7),random(-PI/5,PI/5),false,true,pics0[i]));   //back
	  } else {
	    mem.push(new Memory(random(200,width-200),random(-500,-100),random(0.07,0.1),random(3,7),random(-PI/5,PI/5),false,false,pics0[i]));    //front
	    memBack.push(new Memory(random(200,width-200),random(-500,-100),random(0.03,0.07),random(3,7),random(-PI/5,PI/5),true,true,pics0[i]));    //back
	  }
	}
	
	picExitB1=new ExitButton(width/2+315,height/2-245,0,7);
	picExitB2=new ExitButton(width/2+160,height/2-265,0,7);
	
	//shelter
	for (var i=0; i<pics2.length; i++) {
	  env.push(new Environment(width/2,height/2-25,720,480,255,100,pics3[i],pics2[i]));
	}
	currEnv=0;
	left=new Tool(50,height/2-25,30,30,255,200,255);
	right=new Tool(width-50,height/2-25,30,30,255,200,255);
	//draw
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
	
	drawing=false;
	drawExitB=new ExitButton(840,60,0,5);
	//stylus=new Stylus(stylusImg)
	
	//for pausing/running program
  looping=true;
}

function draw() {
  
  //PRESENT PAGE
  if(currPage==pages[2]) {
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
    // if(selMem.selected==false) {
    //   //reset('all',-1);        //reset all components
    //   selMem.reset();
    //   currPage=pages[1];      //go back to memory page
    // }
  
  //SHELTER PAGE
  } else if(currPage==pages[3]) {
    background(160,240,250);    //blue background
    
    if (currEnv>0) {
      left.ifHover(mouseX,mouseY);
      left.display();
      if(left.selected) {
        currEnv--;
        console.log(currEnv);
        wait(1);
        left.selected=false;
      }
    }
    if (currEnv<env.length-1) {
      right.ifHover(mouseX,mouseY);
      right.display();
      if(right.selected){
        currEnv++;
        wait(1);
        right.selected=false;
      }
    }
    env[currEnv].ifHover(mouseX,mouseY);
    if (env[currEnv].selected) {
      selEnv=env[currEnv];
      drawBG();             //set up 'drawing program'
      currPage=pages[4];    //go to draw page
      reset('e',currEnv);         //'turns off' other environments
     // break;                //exits for loop
    } else {
      env[currEnv].display();
    }
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
    //tools
    for(var i=0; i<tools.length; i++) {
      tools[i].ifHover(mouseX,mouseY);
      tools[i].display();
      if(tools[i].selected==true) {
        reset('t',i)          //makes sure only one tool selected at a time
      }
    }
    //display drop down menus
    dd1.show();
    dd2.show();
    //controls
    for(var i=0; i<controls.length; i++) {
      for(var j=0; j<controls[i].length; j++) {
        controls[i][j].ifHover(mouseX,mouseY);
        controls[i][j].display();
        if(controls[i][j].selected==true) {
          reset('c',i,j)       //makes buttons 'one-click only', not 'select'
        }
      }
    }
    //finish button
    finish.ifHover(mouseX,mouseY);
    finish.display();
    fill(50);
    noStroke();
    text('Finish',finish.x,finish.y);
    if(finish.selected) {
      selEnv.sketch=false;    //transition to reveal image
    }
    //displays sketch/image
    selEnv.update();
    selEnv.display();
    if(selEnv.selected==false) {
      finish.selected=false;    //reset finish button
      selEnv.sketch=true;       //next time environment is selected, have to start at sketch again
      reset('all',-1);          //reset all components
      currPage=pages[3];        //go back to 'shelter' page
    }
    // if((mouseX>90 && mouseX<width-50) && (mouseY>50 && mouseY<height-100)) {
    //   stylus.update();
    //   stylus.display()
    // }
  }
  
  //MAIN BUTTONS
  stroke(255);
  strokeWeight(2);
  line(75,550,825,550);
  for (var i=0; i<mainButtons.length; i++) {
    mainButtons[i].display();
    mainButtons[i].ifHover(mouseX,mouseY);
    mainButtons[i].mark();
  }
}

//draws a 'drawing program'
function drawBG() {
  noStroke();
  fill(230);
  rect(width/2,height/2-25,800,450)
  fill(200)
  rect(width/2+20,height/2-10,600,400)    //drawing space
  fill(190,170,235);          //purple
  rect(470,65,760,30)                     //control menu (top)
  rect(70,height/2-25,40,450)             //tool menu (left side)
}

//resets certain or all components
//can choose one of each to not reset
//if want to reset all, set num=-1
function reset(type,num,num2) {
  if(num2===undefined) {
    num2=null;
  }
  //just resets specific, since they should be 'off' all the time
  if(type=='c'){
    controls[num][num2].selected=false;
  //reset tools
  }else if(type=='t') {
    for(var i=0; i<tools.length; i++) {
      if(i!=num) {
        tools[i].selected=false;
      }
    }
  //reset memories
  }else if(type=='m') {
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
  //controls not included because they're always false
  } else if(type=='all') {
    for(var i=0; i<tools.length; i++) {
      tools[i].selected=false;
    }
    for(var j=0; j<mem.length; j++) {
      mem[j].reset();
    }
    for(var k=0; k<memBack.length; k++) {
      memBack[k].reset();
    } 
    for(var l=0; l<env.length; l++) {
      env[l].reset();
    }
    dd1.hide();
    dd2.hide();
  }
}

//pause/play bg music
function toggle() {
  if(bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.play();
  }
}

//tests if menu buttons are clicked
function mousePressed() {
  for(var i=0; i<mainButtons.length; i++) {
    var x=mainButtons[i].x;
    var y=mainButtons[i].y;
    //calculates distance between mouse and button
    if(dist(mouseX,mouseY,x,y)<=20) {
      currPage=pages[i+1];      //go to respective page
      console.log(currPage);
      reset('all',-1);          //reset all components
    }
  }
}

//pauses/runs program when 'spacebar' is pressed
function keyPressed() {
  if(key==' ') {
    if(looping) {
      bgm.pause();
      noLoop();
    } else {
      loop();
      bgm.play();
    }
    looping=!looping;
  }
}

//wait for s seconds
function wait(s) {
  var start=second();
  var end=start;
  while(end!=((start+s)%59)) {
    end=second();
  }
}