var bg, bgImg
var player, playerImg, playerShootImg;

var z1, z2, z3, z4, zombie, zombieGroup

var nBullets = 2

var gameState = "play"

function preload() {
  bgImg = loadImage("assets/bg.jpeg")

  playerImg = loadImage("assets/shooter_1.png")

  bulletImg = loadImage("assets/bullet.png")

  overImg = loadImage("assets/gameOver.png")
  

  playerShootImg = loadImage("assets/shooter_3.png")

  z1 = loadImage("assets/zombie.png")
  z2 = loadImage("assets/zambie2.png")
  z3 = loadImage("assets/zombie3.png")
  z4 = loadImage("assets/zombie4.png")
}

function setup() {

  createCanvas(windowWidth, windowHeight)

  bg = createSprite(width / 2, height / 2, width, height)
  bg.addImage(bgImg)
  bg.scale = 1.2

  player = createSprite(130, height - 110)
  player.addImage(playerImg)
  player.scale = 0.5
  // player.debug = true

  player.setCollider("rectangle", 0, 0, 300, 300)

  zombieGroup = createGroup()
  bulletGroup = createGroup()
}


function draw() {
  background("green")

  if (keyDown("UP_ARROW")) {
    player.y = player.y - 20
  }
  if (keyDown("DOWN_ARROW")) {
    player.y = player.y + 20
  }

  if (keyWentDown("SPACE")) {
    player.addImage(playerShootImg)
  }

  else if (keyWentUp("SPACE")) {
    player.addImage(playerImg)
  }

  spawnZombies()

  if (keyWentDown("SPACE")) {
    shootBullet()
    nBullets -= 1

  }

  if (nBullets <= 0) {
    gameState = "end"
  }

  if (gameState === "end") {
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
    player.destroy()

    gameOver = createSprite(width/2 , height/2)
    gameOver.addImage(overImg)
  }

  if (zombieGroup.isTouching(bulletGroup)) {
    for (var i = 0; i < zombieGroup.length; i++) {

      if (zombieGroup[i].isTouching(bulletGroup)) {
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
      }
    }
  }

  drawSprites()

  textSize(26)
  fill("red")
  text("No. of Bullets Left : " + nBullets , width - 340 , 50)

}


function spawnZombies() {

  if (frameCount % 60 == 0) {
    zombie = createSprite(width, round(random(300, height - 160)))
    zombie.velocityX = -4

    var n = round(random(1, 4))

    switch (n) {
      case 1: zombie.addImage(z1)
        zombie.scale = 0.2
        zombie.setCollider("rectangle", 0, 0, 600, 800)
        break

      case 2: zombie.addImage(z2)
        zombie.setCollider("rectangle", 0, 0, 200, 350)
        zombie.scale = 0.6
        break

      case 3: zombie.addImage(z3)
        zombie.setCollider("rectangle", -20, 0, 100, 200)
        zombie.scale = 1.2
        break

      case 4: zombie.addImage(z4)
        // zombie.debug = true
        zombie.scale = 0.3
        break

    }

    zombieGroup.add(zombie)
  }
}


function shootBullet() {
  bullet = createSprite(player.x + 120, player.y - 53)
  bullet.addImage(bulletImg)
  bullet.velocityX = 5
  bullet.scale = 0.07

  bulletGroup.add(bullet)
}




