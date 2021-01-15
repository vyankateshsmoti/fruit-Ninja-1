//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,knifeImage;
var fruit;
var fruit1,fruit2,fruit3,fruit4;
var alien,alienImg,alien1Img;
var gameOver,gameOverImg;
var gameOverSound,knifeSound;
 
var bk,bkImg;
var restart,restart_Img;


function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1 = loadImage ("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alien_Img = loadAnimation("alien1.png","alien2.png");
  //alien1Img = loadImage("alien1.png");
  gameOverImg = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  bkImg = loadImage("background.png");
  restart_Img = loadImage("restart.png");
}



function setup() {
  createCanvas(400, 400);
  
  //creating sword
  
  
   bk = createSprite(200,200,600,600);
   bk.addImage("background.png",bkImg); 
  bk.scale = 0.5;
  
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);
knife.debug=false;
  score=0;
  //create fruit and monster Group variable here
  
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImg);
  //gameOver.visible = true 
  restart = createSprite(200,250);
  restart.addImage(restart_Img);
  restart.scale = 0.2;
  restart.visible = true
  
  fruitsGroup =  new Group;
  aliensGroup = new Group;
}

function draw() {
  background("lightgreen");
   
  
  if(gameState===PLAY){
    
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    gameOver.visible = false;
    restart.visible = false;
     
     fruits();
    spawnalien();
    
   
    
    if(fruitsGroup.isTouching(knife)){
      fruitsGroup.destroyEach();
      knifeSound.play();
      score = score+1;
    }
   else if(aliensGroup.isTouching(knife)){
    
     aliensGroup.destroyEach();
     fruitsGroup.destroyEach();
     gameOver.visible = true;
     restart.visible = true;
     gameOverSound.play()
     
      gameState = END;
   } 
  
    else if(gameState === END){
       
      fruitsGroup.destroyEach();
      fruitsGroup.setVelocityXEach =0;
      aliensGroup.setVelocityXEach =0;
    }
   
      
  }
 if(mousePressedOver(restart)){
        
        reset();
      }
  drawSprites();
  
  
  textSize(25);
  text("Score : "+ score,250,50);
}
function fruits(){
  if(frameCount % 60 === 0){
     fruit = createSprite(500,200,20,20);
     fruit.scale = 0.2
  
  r = Math.round(random(1,4));
  
  if(r==1){
    fruit.addImage(fruit1);
  }
  else if (r==2){
    fruit.addImage(fruit2);
    }
  else if(r==3){
    fruit.addImage(fruit3);
  }
  else if(r==4){
    fruit.addImage(fruit4);
  }
     fruit.y = Math.round(random(50,340));
  
    fruit.velocityX = -(8 + 3*(score/5));
    fruitsGroup.add(fruit);
}
}

function spawnalien(){
  if(frameCount % 200 === 0){
    alien = createSprite(600,400,20,20);
    alien.addAnimation("running",alien_Img)   
  
    r2 = Math.round(random(1,2));
     
    alien.y =Math.round(random(50,340));
    alien.velocityX=-(8+score/10);
    aliensGroup.add(alien);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  
  
}