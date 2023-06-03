var PLAY  = 1;
var END = 0;
var gameState = PLAY;
var pikachu_image;
var pikachu1, pikachu2, pikachu3, pikachu4;
var pikachuAnimation;
var pikachuSprite;
var obstacleGroup, obstacle1, obstacle2, obstacle3;
var ground,groundImage,invisibleGround;
var score;
var gameOverImg, restartImg;
var checkPointSound, dieSound;
function preload(){
pikachuAnimation = loadAnimation("assets/Pikachu1.png", "assets/Pikachu2.png", "assets/Pikachu3.png", "assets/Pikachu4.png");
obstacle1 = loadImage("assets/Lugia.jpg");
obstacle2 = loadImage("assets/Charizard.png");
obstacle3 = loadImage("assets/Arceus-Pokemon-PNG-Images-HD.png");
groundImage = loadImage("ground2.png");
background_image = loadImage("Background.png");
gameOverImg = loadImage("Game Over Image.jpg");
restartImg = loadImage("Restart.jpg");
checkPointSound =loadSound("checkpoint.mp3");
dieSound = loadSound("die.mp3");
}
function setup() {
  createCanvas(600, 400);


  
  pikachuSprite = createSprite(50,160,20,50);
  pikachuSprite.addAnimation("animation", pikachuAnimation);

  pikachuSprite.scale = 0.15;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("grounded",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  

 
  gameOver.scale = 0.09;



  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstacleGroup = new Group();



   
  score = 0;
  
}

function draw() {
  
  background(250);
  
  text("Score: "+ score, 500,50);
  
    
  console.log(pikachuSprite.velocityY);
  if(gameState === PLAY){

    gameOver.visible = false;
   
    
    ground.velocityX = -(4 + 3* score/100);
   
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() ;
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& pikachuSprite.y >= 10) {
        pikachuSprite.velocityY = -19;
        
    }
    pikachuSprite.velocityY =pikachuSprite.velocityY + 0.8;
   
  
  
    spawnObstacles();
    
    if(obstacleGroup.isTouching(pikachuSprite)){
          pikachuSprite.visible = false;
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
       
    pikachuSprite.changeAnimation("collided", pikachu4);
    
     
     
      ground.velocityX = 0;
      pikachuSprite.velocityY = 0;
      
     
      
    obstacleGroup.setLifetimeEach(-1)
     
     obstacleGroup.setVelocityXEach(0) ;  
   }
  
 

  pikachuSprite.collide(invisibleGround);
  
 


  drawSprites();
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
  
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale = 0.2;
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale  = 0.05;
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale = 0.1;
              break;
      default: break;
    }
   
             

    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}




