var ape, score, ground, invisibleGround;
var scle, ban_img, ob_img, backGround, bg_img;
var ape_img;
var bannsGroup, obstaclesGroup;
var edges=[];
var play, end, gameState;

function preload(){
  ban_img=loadImage("banana.png");
  bg_img=loadImage("jungle.jpg");
  ape_img = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  ob_img=loadImage("stone.png");
  ban_img=loadImage("banana.png");
}
function setup() {
  createCanvas(600, 300);
  backGround= createSprite(600,1,10,10);
  backGround.addImage(bg_img);
  backGround.scale=1.3;
  ape= createSprite(100,240,20,50);
  ape.addAnimation("running", ape_img);
  invisibleGround = createSprite(100,280,1000,1);
  invisibleGround.visible = false;
  ape.scale = 0.1;
  bannsGroup= new Group();
  obstaclesGroup= new Group();
  play=0;
  end=1;
  gameState=play;
  score=0;
}

function draw() {
  background(255);
  edges=createEdgeSprites();
 
  ape.collide(invisibleGround);
  if(gameState===play){
  backGround.velocityX=-2;
  spawnObstacles();
  spawnBanns();
      drawSprites();
  if(backGround.x<0)
    {
      backGround.x=backGround.width/2;
    }
          if(keyDown("space") && ape.y >= 240){
      ape.velocityY = -14 ;
    }
    ape.velocityY = ape.velocityY + 0.8;
  if(bannsGroup.isTouching(ape)){
    bannsGroup.destroyEach();
    ape.velocityX=0;
    ape.velocityY=0;
    score=score+1;
  }
  if(obstaclesGroup.isTouching(ape))
    {
      gameState=end;
    }
  }
  else if(gameState===end)
    {
    obstaclesGroup.setVelocityXEach(0);
    bannsGroup.setVelocityXEach(0);
    ape.velocityX = 0;
    bannsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    backGround.velocityX = 0;
    points=0;
    timeAlive=0;
    textSize(20);
    text("GAME OVER",300,150);
    }
 
 stroke("white");
  textSize(20);
  text("Score:" + score, 500,50);
}
function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(600,255,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(ob_img);
    obstacle.scale = 0.15;
    obstacle.lifetime = 110;
    obstaclesGroup.add(obstacle);
  }
}
  function spawnBanns() {
  if(World.frameCount % 80 === 0) {
    var bann = createSprite(600,150,10,40);
    bann.velocityX = -6;
    bann.addImage(ban_img);
    bann.scale = 0.05;
    bann.lifetime = 110;
    bannsGroup.add(bann);
  }
  }