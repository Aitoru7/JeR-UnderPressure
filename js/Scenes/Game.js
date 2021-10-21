export default class Game extends Phaser.Scene{
    constructor(){
        super({key: 'Game'})
    } 
    init(){
        this.player1;
        this.player2;
        this.wallpaper;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyW =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
    preload(){
        this.load.spritesheet('robot1', 'Assets/andar-sheet1.png', { frameWidth: 40, frameHeight: 50 });
        this.load.spritesheet('robot2', 'Assets/andar-sheet.png', { frameWidth: 40, frameHeight: 50 });
        this.load.image('stop1', 'Assets/player1.png');
        this.load.image('stop2', 'Assets/player2.png');
        this.load.image('building', 'Assets/Edificio.png');
    }
    create(){
        this.wallpaper = this.physics.add.staticImage(800, 600, 'building');
        this.player1 = this.physics.add.sprite(300, 1000, 'stop1');
        this.player2 = this.physics.add.sprite(450, 1000, 'stop2');
    
        this.player2.setCollideWorldBounds(true, 0.2, 0.2);
        this.player1.setCollideWorldBounds(true, 0.2, 0.2);

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
    }
    update(){
        if (this.keyA.isDown)
    {
        this.player1.flipX = true;
        this.player1.setX(this.player1.x-5);

        this.player1.anims.play('left2', true);
    }
    else if (this.keyD.isDown)
    {
        this.player1.flipX = false;
        this.player1.setX(this.player1.x+5);

        this.player1.anims.play('right2', true);
    }
    else
    {
        this.player1.anims.play('turn2');
    }
    if (this.keyW.isDown) //&& player2.body.touching.down)
    {
        this.player1.setY(this.player1.y-7);
    }


    if (this.cursors.left.isDown)
    {
        this.player2.flipX = true;
        this.player2.setX(this.player2.x-5);

        this.player2.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player2.flipX = false;
        this.player2.setX(this.player2.x+5);

        this.player2.anims.play('right', true);
    }
    else
    {
        this.player2.anims.play('turn');
    }
    if (this.cursors.up.isDown) //&& player2.body.touching.down)
    {
        this.player2.setY(this.player2.y-5);
    }

    }
}