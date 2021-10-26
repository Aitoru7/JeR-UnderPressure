import Player from "../Clasess/Player.js";
import Averías from "../Clasess/Averías.js";
import Employer from "../Clasess/Employer.js";
var timer;
var timer2;
var keyW;
var keyA;
var keyD;
var keyE;
var player1;
var player2;
var averias;
var timep1;
var timep2;
var button1;
var collider;
export default class Game extends Phaser.Scene{
    constructor(){
        super({key: 'Game'})
    } 
    init(){
        collider;
        //combo = this.input.keyboard.createCombo();
        timep1 = 20000;
        timep2 = 20000;
        button1;
        this.platforms;
        this.error=25000;
        averias = [];
        player1;
        player2;
        this.posi = 0;//Math.round(Math.random() * (averias.length - 0) + 0);
        timer = this.time.addEvent({callback: () => {player2.setAcceleration(0), player1.setAcceleration(0)}, delay: 1000, callbackScope: this, loop: true}); 
        timer2 = this.time.addEvent({callback: () => {keyW.enabled=true, keyA.enabled=true, keyD.enabled=true, button1.setVisible(false), player1.body.enable = true}, delay: Math.round(Math.random() * (8500 - 3000) + 3000), callbackScope: this, loop: true});          
        this.wallpaper;
        this.cursors = this.input.keyboard.createCursorKeys();
        keyW =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
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
        this.platforms.create(509, 185, 'separator1').setScale(0.7).refreshBody();
        this.platforms.create(512, 387, 'separator2').setScale(0.7).refreshBody();
        this.platforms.create(700, 341, 'platform2C').setScale(0.83).refreshBody();
        this.platforms.create(35, 341, 'platform2L').setScale(0.83).refreshBody();
        this.platforms.create(5, 245, 'wall1').setScale(0.7).refreshBody();
        this.platforms.create(1077, 247, 'wall1').setScale(0.85).refreshBody();
        this.platforms.create(47, 445, 'wall1').setScale(0.63).refreshBody();
        this.platforms.create(1067, 445, 'wall1').setScale(0.63).refreshBody();
        this.platforms.create(651, 545, 'platform1C').setScale(0.83).refreshBody();
        this.platforms.create(88, 545, 'platform1L').setScale(0.83).refreshBody();
        this.platforms.create(141, 635, 'wall0').setScale(2.74).refreshBody();
        this.platforms.create(1000, 635, 'wall0').setScale(2.74).refreshBody();
        this.platforms.create(651, 715, 'platform0').setScale(0.83).refreshBody();
        this.paint= this.add.image(579,230,'paint');
        new Employer(this, 585, 657, 'employee').anims.play('l', true);
        new Employer(this, 755, 463, 'employee').anims.play('l', true);
        new Employer(this, 380, 463, 'employee').anims.play('l', true);
        new Employer(this, 820, 245, 'employee').anims.play('l', true);
        new Employer(this, 300, 245, 'employee').anims.play('l', true);
        averias.push(this.averiaplanta1= new Averías(this, 400, 600,'plantani', 'plant', 0, 4).setScale(0.5).refreshBody());
        averias.push(this.averiaplanta2= new Averías(this, 520, 298,'printerAnim', 'printer', 0, 8).setScale(0.67).refreshBody());
        averias.push(this.averiaplanta3= new Averías(this, 550, 400,'bookshelfAnim', 'bookshelf', 0, 4).setScale(0.67).refreshBody());
        player1 = new Player(this, 300, 1000, 'robot1', 'stop1');
        player2 = new Player(this, 500, 1000, 'robot2', 'stop2');
        button1 = this.physics.add.staticImage(0, 0, 'interaction').setScale(0.5).setVisible(false).setScale(0.67);
        this.physics.add.collider(player1, player2, function (player1, player2){
            if(player2.x>player1.x){
                player2.setAccelerationX(50000);
                player1.setAccelerationX(-50000);
            }else{
                player2.setAccelerationX(-50000);
                player1.setAccelerationX(50000);
            }
            timer;  
        });
        this.physics.add.collider(player1, this.platforms);
        this.physics.add.collider(player2, this.platforms);
        for(let i=0; i<averias.length; i++){
            this.physics.add.collider(this.platforms, averias[i]);
        }  
        this.physics.world
        keyE.on("down", function(){
            for(let i=0; i<averias.length; i++){  
                if ((player1.x < averias[i].x+85) && (player1.x > averias[i].x-85) && (player1.y > averias[i].y-85) && (player1.y < averias[i].y+20) && averias[i].a==true){
                    keyW.enabled=false;
                    keyA.enabled=false;
                    keyD.enabled=false; 
                    player1.body.enable = false;   
                    averias[i].a = false;
                    averias[i].body.enable = false;
                    averias[i].anims.play(averias[i].key[1], true);
                    console.log(averias[i].a, averias[i].sprite);
                }
            }
        });        
    }
    update(time, delta){
        //console.log(time);
        button1.x=player1.x;
        button1.y=player1.y - 50;
        /*if (time > timep1){
            this.scene.start('GameOver');
        }
        if(time > timep2){
            this.scene.start('GameOver');
        }
        if(averias.length == 0 && time > error){
            this.scene.start('GameOver');
        }*/
        button1.setVisible(false); 
        if(time > this.error){
            do{
                this.posi = Math.round(Math.random() * ((averias.length-1) - 0) + 0);
                console.log(averias[this.posi].a);
            }while(averias[this.posi].a != false);
            averias[this.posi].anims.play(averias[this.posi].key[0], true);
            averias[this.posi].body.enable = true;
            collider = this.physics.add.collider(averias[this.posi], player1, function no(){player1.velocityX = 0}, null, this);
            collider = this.physics.add.collider(averias[this.posi], player2, function no(){player1.velocityX = 0}, null, this);
            averias[this.posi].a = true;
            console.log(averias[this.posi].a);
            this.error+=25000;     
        }
        if (keyA.isDown)
        {
            player1.flipX = true;
            player1.setVelocityX(-400);

            player1.anims.play(player1.key[0], true);
        }

        else if (keyD.isDown)
        {
            player1.flipX = false;
            player1.setVelocityX(400);

            player1.anims.play(player1.key[0], true);
        }
        else
        {
            player1.setVelocityX(0);
            player1.anims.play(player1.key[1]);
        }
        if (keyW.isDown && player1.body.touching.down)
        {
            player1.setVelocityY(-500);
        }

        if (this.cursors.left.isDown)
        {
            player2.flipX = true;
            player2.setVelocityX(-400);

            player2.anims.play(player2.key[0], true);
        }
        else if (this.cursors.right.isDown)
        {
            player2.flipX = false;
            player2.setVelocityX(400)

            player2.anims.play(player2.key[0], true);
        }
        else
        {
            player2.setVelocityX(0);
            player2.anims.play(player2.key[1]);
        }
        if (this.cursors.up.isDown && player2.body.touching.down)
        {
            player2.setVelocityY(-500);
        }
        for(let i=0; i<averias.length; i++){
            if ((player1.x < averias[i].x+85) && (player1.x > averias[i].x-85) && (player1.y > averias[i].y-85) && (player1.y < averias[i].y+20) && averias[i].a==true){
                button1.x=player1.x;
                button1.y=player1.y - 50;
                button1.setVisible(true);
            }
        }
    }
}
