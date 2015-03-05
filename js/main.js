window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('hill', 'assets/hills.jpg');
    game.load.image('road', 'assets/road.jpg');
    game.load.image('tire', 'assets/tire.png');
    game.load.spritesheet('car', 'assets/car.png', 65, 65);
    game.load.audio('honk','assets/honk.mp3');
    game.load.audio('start','assets/start.mp3');
}

var player;
var platforms;
var cursors;
var tires;
var score = 0; 
var start;
var honk;
    
function create() {
    game.add.tileSprite(0, 0, 800, 1200, 'hill');
    game.world.setBounds(0, 0, 800, 1200);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    platforms = game.add.group();

    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'road');
    ground.scale.setTo(10, 2);
    ground.body.immovable = true;
    var ledge = platforms.create(50, 200, 'road');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 200, 'road');
    ledge.body.immovable = true; 
    ledge = platforms.create(50, 400, 'road');
    ledge.body.immovable = true;
    ledge = platforms.create(400,500, 'road');
    ledge.body.immovable = true;
    ledge = platforms.create(0,650, 'road');
    ledge.body.immovable = true;
    ledge = platforms.create(0,775, 'road');
    ledge.body.immovable = true;
    ledge = platforms.create(400,900, 'road');
    ledge.body.immovable = true;
    ledge = platforms.create(0,1000, 'road');
    ledge.body.immovable = true;
    player = game.add.sprite(10, 0, 'car');  
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [4, 5, 6, 7], 15, true);
    player.animations.add('right', [8, 9, 10, 11], 15, true);
    tires = game.add.group();
    tires.enableBody = true;
    var tire = tires.create(55,165, 'tire');
    tire = tires.create(605, 165, 'tire');
    tire = tires.create(51, 365, 'tire');
    tire = tires.create(401,465, 'tire');
    tire = tires.create(1,615, 'tire');
    tire = tires.create(1,740, 'tire');
    tire = tires.create(401,865, 'tire');
    tire = tires.create(1,965, 'tire');
    tire = tires.create(1,1000, 'tire');
    tire.body.gravity.y = 300;

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player);
    start = game.add.audio('start');
    honk = game.add.audio('honk');
}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(tires, platforms);

    game.physics.arcade.overlap(player, tires, collectTires, null, this);
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150 - score*2;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150 + score*2;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 0;
    }
    
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

function collectTires (player, tire) {
    
    tire.kill();
    score += 10;
    honk.play();
    if(score === 90)
    {
        tires.create(100,0, 'tire');
    }
    if(score === 100)
    {
        start.play();
        game.add.text(300, 100, 'Final Time: '+ this.game.time.totalElapsedSeconds(), {        fontSize: '32px',    fill: 'black' });
    }

}
};