var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    this.load.spritesheet('robot1', 'assets/andar-sheet1.png', { frameWidth: 40, frameHeight: 50 });
    this.load.spritesheet('robot2', 'assets/andar-sheet.png', { frameWidth: 40, frameHeight: 50 });
    this.load.image('stop1', 'assets/player1.png');
    this.load.image('stop2', 'assets/player2.png');
}

function create ()
{
    player1 = this.physics.add.sprite(100, 450, 'robot1');
    player2 = this.physics.add.sprite(100, 450, 'robot2');

    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);
    player1.setBounce(0.2);
    player1.setCollideWorldBounds(true);

    
    
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
        player1.setVelocityX(-200);
        player2.setVelocityX(-200);
    });
}

function update ()
{
    if (keys.left.isDown)
    {
        player1.flipX = true;
        player1.setVelocityX(-160);

        player1.anims.play('left2', true);
    }
    else if (keys.right.isDown)
    {
        player1.flipX = false;
        player1.setVelocityX(160);

        player1.anims.play('right2', true);
    }
    else
    {
        player1.setVelocityX(0);

        player1.anims.play('turn2');
    }
    if (keys.up.isDown) //&& player2.body.touching.down)
    {
        player1.setVelocityY(-330);
    }


    if (cursors.left.isDown)
    {
        player2.flipX = true;
        player2.setVelocityX(-160);

        player2.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player2.flipX = false;
        player2.setVelocityX(160);

        player2.anims.play('right', true);
    }
    else
    {
        player2.setVelocityX(0);

        player2.anims.play('turn');
    }
    if (cursors.up.isDown) //&& player2.body.touching.down)
    {
        player2.setVelocityY(-330);
    }
}

