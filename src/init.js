var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1060,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player1;
var player2;
var cursors;
var keys;

var game = new Phaser.Game(config);
function preload ()
{
    this.load.spritesheet('robot1', 'assets/andar-sheet1.png', { frameWidth: 80, frameHeight: 100 });
    this.load.spritesheet('robot2', 'assets/andar-sheet.png', { frameWidth: 80, frameHeight: 100 });
    this.load.image('stop1', 'assets/player1.png');
    this.load.image('stop2', 'assets/player2.png');
    this.load.image('building', 'assets/Edificio.png');
}

function create ()
{
    wallpaper = this.physics.add.staticImage(800, 600, 'building');
    player1 = this.physics.add.sprite(300, 1000, 'stop1');
    player2 = this.physics.add.sprite(450, 1000, 'stop2');

    player2.setCollideWorldBounds(true, 0.2, 0.2);
    player1.setCollideWorldBounds(true, 0.2, 0.2);

    
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('robot2', { start: 1, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'stop2', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('robot2', { start: 1, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('robot1', { start: 1, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn2',
        frames: [ { key: 'stop1', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('robot1', { start: 1, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });
    this.physics.add.collider(player1, player2, function(player1, player2){
        if(player1.flipX == false){
            player1.setAcceleration(-16);
        }else{
            player1.setAcceleration(16);
        }
        if(player2.flipX == false){
            player2.setVelocityX(-16);
        }else{
            player2.setVelocityX(16);
        }
    });
}

function update ()
{
    if (keys.left.isDown)
    {
        player1.flipX = true;
        player1.setX(player1.x-5);

        player1.anims.play('left2', true);
    }
    else if (keys.right.isDown)
    {
        player1.flipX = false;
        player1.setX(player1.x+5);

        player1.anims.play('right2', true);
    }
    else
    {
        player1.anims.play('turn2');
    }
    if (keys.up.isDown) //&& player2.body.touching.down)
    {
        player1.setY(player1.y-7);
    }


    if (cursors.left.isDown)
    {
        player2.flipX = true;
        player2.setX(player2.x-5);

        player2.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player2.flipX = false;
        player2.setX(player2.x+5);

        player2.anims.play('right', true);
    }
    else
    {
        player2.anims.play('turn');
    }
    if (cursors.up.isDown) //&& player2.body.touching.down)
    {
        player2.setY(player2.y-5);
    }
}
