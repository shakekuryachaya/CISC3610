const game = new Phaser.Game(900, 700, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})

//declare the variables so all the methods can access them
let score = 0
let scoreText
let platforms
let stars
//let fires
let cursors
let player

function preload () {
  //load images
  game.load.image('background', './assets/background.png')
  game.load.image('ground', './assets/platform.png')
  game.load.image('star', './assets/star.png')
  //game.load.image('fire', './assets/fire.png')
  game.load.spritesheet('man', './assets/man.png', 50, 50)
}

function create () {
  //Arcade Physics system is for the physics of the game
  game.physics.startSystem(Phaser.Physics.ARCADE)

  //this is the background of pur game
  game.add.sprite(0, 0, 'background')
  platforms = game.add.group()

  //enabling physics for any object that is created in this group
  platforms.enableBody = true

  //this is the ground
  const ground = platforms.create(0, game.world.height - 90, 'ground')
  ground.scale.setTo(5, 5)

  //enables sprite to jump on the ground
  ground.body.immovable = true

  //these are the platforms which will hold the stars
  let ledge = platforms.create(480, 520, 'ground')
  ledge.body.immovable = true
  ledge = platforms.create(-85, 510, 'ground')
  ledge.body.immovable = true
  ledge = platforms.create(245, 430, 'ground')
  ledge.body.immovable = true
  ledge = platforms.create(-140, 410, 'ground')
  ledge.body.immovable = true

  //the sprite as well as its configurations and the enabling of physics
  player = game.add.sprite(35, game.world.height - 170, 'man')
  game.physics.arcade.enable(player)

  //for the sprites bounce
  player.body.bounce.y = 0.3
  player.body.gravity.y = 760
  player.body.collideWorldBounds = true

  //for the stars
  stars = game.add.group()
  //posions = game.add.group()

  //enabling physics for the stars
  //did not work for the fire for collisions sadly
  stars.enableBody = true
  //fires.enableBody = true

  //15 stars which will be equally apart
  for (var i = 0; i < 15; i++) {
    const star = stars.create(i * 60, 0, 'star')

    //  Drop em from the sky and bounce a bit
    star.body.gravity.y = 1200
    star.body.bounce.y = 0.4 + Math.random() * 0.3
  }

  //for (var i = 0; i < 15; i++) {
    //const fire = fires.create(i * 60, 0, 'fire')

    //fire.body.gravity.y = 1000
    //fire.body.bounce.y = 0.3 + Math.random() * 0.2
  //}


  //this is for the score
  scoreText = game.add.text(18, 16, '', { fontSize: '30px', fill: '#170' })

  //bootstrap
  cursors = game.input.keyboard.createCursorKeys()
}

function update () {
  player.body.velocity.x = 0

  //Collisions for the player, stars, and our platforms
  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(stars, platforms)

  //game.physics.arcade.collide(player, platforms)
  //game.physics.arcade.collide(fires, platforms)

  game.physics.arcade.overlap(player, stars, collectStar, null, this)
  if (cursors.left.isDown) {
    player.body.velocity.x = -150
    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150
    player.animations.play('right')
  } else {
    player.animations.stop()
  }

  //for the sprite to jump
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }

  //when score reaches 150, the alert shows
  if (score === 150) {
    alert('Cogratulations! YOU COLLECTED ALL THE STARS AND WON! Score: 150')
    score = 0
  }
}

function collectStar (player, star) {
  //star is removed when sprite touches it
  star.kill()

  //score updates for every star collected
  score += 10
  scoreText.text = 'Score: ' + score
}

  //function collectFire(player, fires) {
    //fire.kill()
    //score -= 10
    //scoreText.text = 'Score: ' + score
//}
