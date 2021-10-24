import Player from "../Clasess/Player.js";
import Averías from "../Clasess/Averías.js";
var timer;
export default class Game extends Phaser.Scene{
    constructor(){
        super({key: 'Game'})
    } 
    init(){
        this.button1;
        this.platforms;
        this.error=5000;
        this.averias = [];
        this.averias2= [];
        this.posi = Math.round(Math.random() * (this.averias.length - 0) + 0);
        this.timer = this.time.addEvent({callback: () => {this.player2.setAcceleration(0), this.player1.setAcceleration(0)}, delay: 1000, callbackScope: this, loop: true}); 
        this.player1;
        this.player2;
        this.wallpaper;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyW =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyE =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }
    preload(){
        this.load.spritesheet('robot1', 'Assets/andar-sheet1.png', { frameWidth: 40, frameHeight: 50 });
        this.load.spritesheet('robot2', 'Assets/andar-sheet.png', { frameWidth: 40, frameHeight: 50 });
        this.load.spritesheet('plantani', 'Assets/Planta-sheet.png', { frameWidth: 60, frameHeight: 120 });
        this.load.spritesheet('employee', 'Assets/trabajador-sheet.png', { frameWidth: 56, frameHeight: 64 });
        this.load.spritesheet('printerAnim', 'Assets/Impresora-sheet.png', { frameWidth: 140, frameHeight: 100 });
        this.load.spritesheet('bookshelfAnim', 'Assets/Librería-sheet.png', { frameWidth: 120, frameHeight: 120 });
        this.load.image('stop1', 'Assets/player1.png');
        this.load.image('stop2', 'Assets/player2.png');
        this.load.image('building', 'Assets/Edificio.png');
        this.load.image('sky', 'Assets/Fondo día.png');
        this.load.image('wall2', 'Assets/Pared P2.png');
        this.load.image('wall1', 'Assets/Pared P1.png');
        this.load.image('wall0', 'Assets/Pared P0.png');
        this.load.image('interaction', 'Assets/Botón interacción E.png');
        this.load.image('platform2C', 'Assets/Plataforma Central P2.png');
        this.load.image('platform2L', 'Assets/Plataforma Lateral P2.png');
        this.load.image('platform1C', 'Assets/Plataforma Central P1.png');
        this.load.image('platform1L', 'Assets/Plataforma Lateral P1.png');
        this.load.image('platform0', 'Assets/Plataforma P0.png');
        this.load.image('separator1', 'Assets/Separador P0.png');
        this.load.image('separator2', 'Assets/Separador P1.png');
        this.load.image('ceiling', 'Assets/Techo.png');
        this.load.image('plant', 'Assets/Planta.png');
        this.load.image('cloud', 'Assets/nube.png');
        this.load.image('sky0', 'Assets/Fondo día.png');
        this.load.image('paint', 'Assets/Cuadro.png');
        this.load.image('printer', 'Assets/Impresora.png');
        this.load.image('bookshelf', 'Assets/Librería.png');
    }
    create(){
        this.add.image(543, 405, 'sky0').setScale(0.7);
        this.rect = new Phaser.Geom.Rectangle(0, 0, 1086, 720);
        this.group = this.add.group({ key: 'cloud', frameQuantity: 15 });
        Phaser.Actions.RandomRectangle(this.group.getChildren(), this.rect);
        
        this.platforms = this.physics.add.staticGroup();
        this.wallpaper = this.physics.add.staticImage(543, 405, 'building').setScale(0.68);
        this.platforms.create(540, 100, 'ceiling').setScale(0.7).refreshBody();
        this.platforms.create(509, 180, 'separator1').setScale(0.7).refreshBody();
        this.platforms.create(512, 387, 'separator2').setScale(0.7).refreshBody();
        this.platforms.create(700, 341, 'platform2C').setScale(0.83).refreshBody();
        this.platforms.create(35, 341, 'platform2L').setScale(0.83).refreshBody();
        this.platforms.create(5, 245, 'wall1').setScale(0.7).refreshBody();
        this.platforms.create(1077, 247, 'wall1').setScale(0.70).refreshBody();
        this.platforms.create(47, 445, 'wall1').setScale(0.63).refreshBody();
        this.platforms.create(1067, 445, 'wall1').setScale(0.63).refreshBody();
        this.platforms.create(651, 545, 'platform1C').setScale(0.83).refreshBody();
        this.platforms.create(88, 545, 'platform1L').setScale(0.83).refreshBody();
        this.platforms.create(141, 635, 'wall0').setScale(2.74).refreshBody();
        this.platforms.create(1000, 635, 'wall0').setScale(2.74).refreshBody();
        this.platforms.create(651, 715, 'platform0').setScale(0.83).refreshBody();
        this.paint= this.add.image(579,230,'paint');
        this.employee= this.physics.add.staticSprite(570, 655, 'employee', 'frame_0000');
        this.averias.push(this.averiaplanta1= new Averías(this, 300, 600,'plantani', 'plant', 0, 4).setScale(0.5));
        this.averias.push(this.averiaplanta2= new Averías(this,520,298,'printerAnim', 'printer', 0, 8).setScale(0.67).refreshBody());
        this.averias.push(this.averiaplanta3= new Averías(this,550,400,'bookshelfAnim', 'bookshelf', 0, 4).setScale(0.67).refreshBody());
        this.player1 = new Player(this, 300, 1000, 'robot1', 'stop1');
        this.player2 = new Player(this, 500, 1000, 'robot2', 'stop2');
        this.button1 = this.physics.add.staticImage(0, 0, 'interaction').setScale(0.5).setVisible(false).setScale(0.67);
        this.physics.add.collider(this.player1, this.player2, function onEvent(player1, player2){
            if(player2.x>player1.x){
                player2.setAccelerationX(50000);
                player1.setAccelerationX(-50000);
            }else{
                player2.setAccelerationX(-50000);
                player1.setAccelerationX(50000);
            }
            timer;  
        });
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.player2, this.platforms);
        for(let i=0; i<this.averias.length; i++){
            this.physics.add.collider(this.platforms, this.averias[i]);
        }
        
    }
    update(time, delta){
    this.button1.setVisible(false); 
    if(time > this.error){
            Math.round(Math.random() * (this.averias.length-1 - 0) + 0);
            this.averias[this.posi].anims.play(this.averias[this.posi].key[0], true);
            this.averias[this.posi].a=true;
            this.physics.add.collider(this.averias[this.posi], this.player1, function no(){this.player1.velocityX = 0;}, null, this);
            this.physics.add.collider(this.averias[this.posi], this.player2, function no(){this.player2.velocityX = 0;}, null, this);
            this.averias[this.posi].setPushable(false);
            this.averias2.push(this.averias[this.posi]);
            this.averias.splice(this.averias[this.posi], 1);
            this.error+=5000;     
    }
        if (this.keyA.isDown)
    {
        this.player1.flipX = true;
        this.player1.setVelocityX(-400);

        this.player1.anims.play(this.player1.key[0], true);
    }
    else if (this.keyD.isDown)
    {
        this.player1.flipX = false;
        this.player1.setVelocityX(400);

        this.player1.anims.play(this.player1.key[0], true);
    }
    else
    {
        this.player1.setVelocityX(0);
        this.player1.anims.play(this.player1.key[1]);
    }
    if (this.keyW.isDown && this.player1.body.touching.down)
    {
        this.player1.setVelocityY(-500);
    }


    if (this.cursors.left.isDown)
    {
        this.player2.flipX = true;
        this.player2.setVelocityX(-400);

        this.player2.anims.play(this.player2.key[0], true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player2.flipX = false;
        this.player2.setVelocityX(400)

        this.player2.anims.play(this.player2.key[0], true);
    }
    else
    {
        this.player2.setVelocityX(0);
        this.player2.anims.play(this.player2.key[1]);
    }
    if (this.cursors.up.isDown && this.player2.body.touching.down)
    {
        this.player2.setVelocityY(-500);
    }
    for(let i=0; i<this.averias2.length; i++){
        if((this.player1.x < this.averias2[i].x+70) && (this.player1.x > this.averias2[i].x-70)){
            this.button1.x=this.player1.x;
            this.button1.y=this.player1.y - 50;
            this.button1.setVisible(true);
            if(this.keyE.isDown){
                    console.log("w");
                    var x = time + 3000;
                    if(time < x){
                        console.log("A");
                        this.player1.setVelocityX(0);
                    }   
            }
        }
    }
}

}
