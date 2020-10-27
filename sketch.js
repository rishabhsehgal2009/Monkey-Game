//variables of all sprites, game sttes, score, sounds and images
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameos,ys,blingSound,gameover,gameoverimage;
var reset,resetimage;
var background;
var jumpsound;
var bundleofbananas, bundleofbanansimage;
var bundleofbananasGroup, background, backgroundimage;
var youwinsound, lives=0;
var youwin, youwinimage;
var youwinsound;
var life = 0;

function preload(){
  //loading all the images and sounds 
 monkey_running =                     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverimage = loadImage("gameos.png");
  resetimage = loadImage("reseti.png");
  gameos = loadSound("game over.mpeg");
  blingSound = loadSound("bling sound effect.mp3");
  jumpsound = loadSound("jumpsound.mp3");
  bundleofbananasimage = loadImage("fruit4.png");
  backgroundimage=loadImage("jungle.jpg");
  youwinimage = loadImage("youwinimage.png");
}

function setup() {
  
  //creating the play area
  createCanvas(400,400);
  
  //creating the background
  background = createSprite(0,0,400,400);
  background.addImage(backgroundimage);
  background.scale = 2;
  
  //creating monkey
  monkey = createSprite(80,315,20,20); 
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1; 
  
  //creating the  invisible scrolling ground
  ground = createSprite(400,400,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  //checking the x position of ground using console.log
  console.log(ground.x);
  
  //creating sprite for game over
  gameover = createSprite(200,200,50,50);
  gameover.addImage(gameoverimage);
  gameover.visible = false;
  
  //you win image
  youwin = createSprite(200,200,50,50);
  youwin.addImage(youwinimage);
  youwin.scale = 0.6;
  youwin.visible = false;
  
  //reset image
  reset = createSprite(200,300,40,40);
  reset.addImage(resetimage);
  reset.scale = 0.2;
  reset.visible=false;
  
  //creating all the groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  bundleofbananasGroup = createGroup();
}

function draw() {
  
  //setting background colour-white
  background.velocityX=-3;
  
  
  //game state play
  if(gameState===PLAY){
    
    //making the ground and you win image become invisible
    ground.visible=false;
    youwin.visible=false;
    
  //making the background come back to its original position to make infinite ground            
    if (background.x < 0){
      background.x = background.width/2;
    }
    
    //making the invisible ground come back to its original position to make infinite ground
    if(ground.x<0){
      ground.x = ground.width/2;
    }
  
  //making the monkey jump when we press space  
    if(keyDown("space") && monkey.y>=345){
      monkey.velocityY = -12;
      jumpsound.play();
    }
  
    //giving gravity to the monkey 
    monkey.velocityY = monkey.velocityY+0.3;
  
    //making the monkey collide with the ground
    monkey.collide(ground);
  
    //calling the bananas, bunch of bananas and enemy function 
    ban();
    obs();
    bananasfunction();  
    }
    
    //increasing the mnokey's height when the score reaches 10's multiples
    switch(score){
        case 10:monkey.scale = 0.12;
                break;
        case 20:monkey.scale = 0.14;
                break;
        case 30:monkey.scale = 0.16;
                break;
        case 40:monkey.scale = 0.18;
                break;
        default:break;        
    }
  
    //increasing the score when monkey gets the bananas
     if(monkey.isTouching(FoodGroup)){
       FoodGroup.destroyEach(); 
       score = score+2;
       blingSound.play();

    }
    //increasing the score when monkey gets the bunch of bananas
    if(monkey.isTouching(bundleofbananasGroup)){
       bundleofbananasGroup.destroyEach(); 
       score = score+4;
       blingSound.play();  
    }

  //game state end
  else if(gameState===END){
    background.velocityX = 0;
    ground.velocityX=0;
    monkey.visible = false;
    gameover.visible = true;
    reset.visible = true;
    
    //making the game restart when clicked on reset picture 
   if(mousePressedOver(reset)){
        restart();
        monkey.visible = true;
        monkey.x = 80;
        monkey.y = 315;
        background.velocityX = 0;
        ground.velocityX=0;
        monkey.visible = true;
        score = 0; 
    }
    //making the lives become 0
    life = 0;  
  }
  
  
  //changing game state to end if score reaches 40 or more then 40
 if(score===50||score>50){ 
    background.velocityX=0;    
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    bundleofbananasGroup.destroyEach();
    monkey.visible=false;
    youwin.visible = true;
    reset.visible = true;

 
  //making the game reset when clicked on reset picture 
  if(mousePressedOver(reset)){
    restart();
    monkey.visible = true;
    monkey.x = 80;
    monkey.y = 315;
    background.velocityX = 0;
    ground.velocityX=0;
    monkey.visible = true;
    score = 0; 
  } 
 }
  
//increasing the lives and decreasing the size of monkey when it touches obstacles  
if(monkey.isTouching(obstacleGroup)){
     life = life+1;  
     monkey.scale = 0.1;
     
  }  

 //making the game state end 
 if(life>40){
   gameState=END;
   gameos.play();
   background.velocityX=0;    
   FoodGroup.destroyEach();
   obstacleGroup.destroyEach();
   bundleofbananasGroup.destroyEach();
   monkey.visible=false;
   
 }
  
  
  //drawing all sprite
  drawSprites();
  
  //writing the score 
  stroke("black");
  textSize(20);
  fill("red");
  text("score:"+ score,300,50);
  text("Target:50", 300,20);
  
}
//function for bananas
function ban(){
  if(frameCount%120===0){
    banana = createSprite(400,150,10,40); 
    banana.y = Math.round(random(100,250));  
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(5+score/2);       
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1; 
    banana.lifetime = 150;
    FoodGroup.add(banana);
}
}

//function for obstacles
function obs(){
  if(frameCount%150===0){
     obstacle = createSprite(380,380,10,40);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityX = -(3+score/2);
     obstacle.depth = monkey.depth;
     monkey.depth = monkey.depth+1;
     obstacle.lifetime = 200;
     obstacleGroup.add(obstacle);
  }
}


//function for bunch of bananas
function bananasfunction(){
  if(frameCount%180===0){
bundleofbananas= createSprite(400,Math.round(random(100,250)),10,40);
    bundleofbananas.addImage(bundleofbananasimage);
    bundleofbananas.scale = 0.1;
    bundleofbananas.velocityX = -(5+score/2);
    bundleofbananas.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    bundleofbananas.lifetime = 200;
    bundleofbananasGroup.add(bundleofbananas);
  }
}


//function for restart
function restart(){ 
  gameState = PLAY;
  gameover.visible = false;
  reset.visible = false;
  youwin.visble=false;
  
}