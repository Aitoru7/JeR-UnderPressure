import Player from "../Clasess/Player.js";

export default class Game extends Phaser.Scene{
    constructor(){
        super({key: 'Game'})
    } 
    init(){
        this.timer;  
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
        this.player1 = new Player(this, 300, 1000, 'robot1', 'stop1');
        this.player2 = new Player(this, 500, 1000, 'robot2', 'stop2');
        timer =  this.time.addEvent({callback: () => {this.player2.setAcceleration(0), this.player1.setAcceleration(0)}, delay: 1000, callbackScope: this, loop: true}); 
        //this.physics.add.collider(this.player1, this.player2, onEvent(this.player1, this.player2));
    }
    update(){
        if (this.keyA.isDown)
    {
        this.player1.flipX = true;
        this.player1.setX(this.player1.x-5);

        this.player1.anims.play(this.player1.key[0], true);
    }
    else if (this.keyD.isDown)
    {
        this.player1.flipX = false;
        this.player1.setX(this.player1.x+5);

        this.player1.anims.play(this.player1.key[0], true);
    }
    else
    {
        this.player1.anims.play(this.player1.key[1]);
    }
    if (this.keyW.isDown) //&& player2.body.touching.down)
    {
        this.player1.setY(this.player1.y-7);
    }


    if (this.cursors.left.isDown)
    {
        this.player2.flipX = true;
        this.player2.setX(this.player2.x-5);

        this.player2.anims.play(this.player2.key[0], true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player2.flipX = false;
        this.player2.setX(this.player2.x+5);

        this.player2.anims.play(this.player2.key[0], true);
    }
    else
    {
        this.player2.anims.play(this.player2.key[1]);
    }
    if (this.cursors.up.isDown) //&& player2.body.touching.down)
    {
        this.player2.setY(this.player2.y-5);
    }

    }
}
