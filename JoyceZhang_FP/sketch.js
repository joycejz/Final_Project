//MAIN CODE

var font;

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
var numEnv=8;
var currEnv;
var left;
var right;
//drawing program
var drawing;
var selEnv;
var pics3=[];
var sketch=[];
var toolPics=[];
var ctrlPics=[[],[],[]];
var tools=[];
var bCtrls=[];
var controls=[[],[],[]];
var numSketch=8;
var numTools=5;
var numCtrls=3;
var numBCtrls=2;
var drawExitB;
var finish;
var dd1;
var dd2;
//var stylus;
//var stylusImg;

//for pausing/running the program
var looping;

function preload() {
  font=loadFont('assets/font.ttf');
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
	for (var i=0; i<numTools; i++) {
	  toolPics[i]=loadImage('data/tool'+i+'.png');
	}
	for(var i=0; i<numCtrls; i++) {
	  for(var j=0; j<numCtrls; j++) {
	    var n=(i*3)+j;
	    ctrlPics[i][j]=loadImage('data/ctrl'+n+'.png');
	  }
	}
	
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
	textAlign(CENTER);
	textFont(font);
	textSize(20);
  
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
	  env.push(new Environment(width/2,height/2-25,720,480,255,color(65,135,170),pics3[i],pics2[i]));
	}
	currEnv=0;
	left=new Tool(50,height/2-25,30,30,255,200,200);
	right=new Tool(width-50,height/2-25,30,30,255,200,200);
	//draw
	for(var i=0; i<toolPics.length; i++) {
	  tools.push(new Tool(70,110+(i*40),25,25,255,color(215,225,230),color(190,200,200),toolPics[i]));
	}
	finish=new Tool(150,65,80,20,color(225,215,240),255,color(155,110,200));
	for (var i=0; i<numBCtrls; i++) {
	  bCtrls.push(new Tool(240+(25*i),65,21,21,color(210,245,255),color(155,235,255),color(105,200,225),ctrlPics[1][i]));
	}
	for(var i=0; i<ctrlPics.length; i++) {
	  var x=330+(175*i);
	  for (var j=0; j<ctrlPics[i].length; j++) {
	    controls[i].push(new Tool(x+(25*j),65,20,20,255,color(215,225,230),color(190,200,200),ctrlPics[i][j]));
	  }
	}
	
	dd1=createSelect();
  dd1.position(425,55);
  dd1.size(60,20);
  dd1.option('12.50%');
  dd1.option('25%');
  dd1.option('50%');
  dd1.option('75%');
  dd1.option('100%');
  dd1.option('200%');
  dd1.hide();
    
  dd2=createSelect();
  dd2.position(600,55);
  dd2.size(60,20);
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
      stroke(0);
      strokeWeight(3);
      noFill();
      line(left.x-10,left.y,left.x+10,left.y-10);
      line(left.x-10,left.y,left.x+10,left.y+10);
      if(left.selected) {
        currEnv--;
        wait(1);
        left.selected=false;
      }
    }
    if (currEnv<env.length-1) {
      right.ifHover(mouseX,mouseY);
      right.display();
      stroke(0);
      strokeWeight(3);
      noFill();
      line(right.x+10,right.y,right.x-10,right.y-10);
      line(right.x+10,right.y,right.x-10,right.y+10);
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
    //display drop down menus
    dd1.show();
    dd2.show();
    //controls
    for(var i=0; i<controls.length; i++) {
      for(var j=0; j<controls[i].length; j++) {
        controls[i][j].ifHover(mouseX,mouseY);
        controls[i][j].display();
        if(controls[i][j].selected) {
          reset('c',i,j)       //makes buttons 'one-click only', not 'select'
        }
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
    if(mainButtons[i].selected) {
      currPage=pages[i+1];      //change page
      reset('all',-1);          //reset everything when page changes
    }
  }
}

//draws a 'drawing program'
function drawBG() {
  background(160,240,250);    //blue background
  noStroke();
  fill(230);
  rect(width/2,height/2-25,800,450)
  fill(200)
  rect(width/2+20,height/2-10,600,400)    //drawing space
  fill(190,170,235);          //purple
  rect(470,65,760,30)                     //control menu (top)
  rect(70,height/2-25,40,450)             //tool menu (left side)
  fill(255);
  stroke(50);
  strokeWeight(0.5);
  rect(130,115,75,55);
  fill(0);
  noStroke(0);
  textSize(12);
  text('Try the blue',130,100);
  text('buttons!',130,110)
  text('Click finish when',130,125);
  text('you are done.',130,135);
  textSize(20);
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
    for(var m=0; m<mainButtons.length; m++) {
      mainButtons[m].selected=false;
    }
    my0=800;
    my1=1000;
    my2=1200;
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
  while(end!=((start+s)%60)) {
    end=second();
  }
}