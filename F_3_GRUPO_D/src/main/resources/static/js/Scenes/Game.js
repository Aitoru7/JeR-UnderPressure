import Player from "../Clasess/Player.js";
import Averías from "../Clasess/Averías.js";
import Employer from "../Clasess/Employer.js";
var timer;
var timer2;
var timer3;
var keyW;
var keyA;
var keyD;
var keyE;
var keyPeriod;
var player1;
var player2;
var averias;
var missions1;
var missions2;
var timep1;
var timep2;
var button1;
var button2;
var collider;
var cursors;
var text1;
var text2;
var newpos;
export default class Game extends Phaser.Scene{
    constructor(){
        super({key: 'Game'})
    } 
    init(){
        collider;
        //combo = this.input.keyboard.createCombo();
        timep1 = 50000;
        timep2 = 50000;
        button1;
        button2;
        this.platforms;
        this.error=25000;
        averias = [];
        missions1=[];
        missions2=[];
        player1;
        player2;
        this.posi = 0;//Math.round(Math.random() * (averias.length - 0) + 0);
        timer = this.time.addEvent({callback: () => {player2.setAcceleration(0), player1.setAcceleration(0)}, delay: 1000, callbackScope: this, loop: true}); 
        timer2 = this.time.addEvent({callback: () => {keyW.enabled=true, keyA.enabled=true, keyD.enabled=true, button1.setVisible(false), player1.body.enable = true}, delay: Math.round(Math.random() * (8500 - 3000) + 3000), callbackScope: this, loop: true});    
        timer3 = this.time.addEvent({callback: () => {cursors.enabled = true, button2.setVisible(false), player2.body.enable = true}, delay: Math.round(Math.random() * (8500 - 3000) + 3000), callbackScope: this, loop: true});          
        this.wallpaper;
        cursors = this.input.keyboard.createCursorKeys();
        keyW =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyPeriod = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
        newpos=true;
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
        this.load.image('interaction2', 'Assets/Botón interacción ..png' )
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
        this.load.image('missionj1', 'Assets/Flecha J1.png');
        this.load.image('missionj2', 'Assets/Flecha J2.png');
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
        this.platforms.create(1077, 240, 'wall1').setScale(0.63).refreshBody();
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
        
        missions2.push(this.a = this.add.image(585,607, 'missionj2'));
        missions2.push(this.b = this.add.image(755,413, 'missionj2'));
        missions2.push(this.c =this.add.image(380,413, 'missionj2'));
        missions2.push(this.d =this.add.image(820,195, 'missionj2'));
        missions2.push(this.e =this.add.image(300,195, 'missionj2'));
        missions1.push(this.f =this.add.image(585,607, 'missionj1'));
        missions1.push(this.g =this.add.image(755,413, 'missionj1'));
        missions1.push(this.h =this.add.image(380,413, 'missionj1'));
        missions1.push(this.i =this.add.image(820,195, 'missionj1'));
        missions1.push(this.j =this.add.image(300,195, 'missionj1'));
        averias.push(this.averiaplanta1= new Averías(this, 400, 600,'plantani', 'plant', 0, 4).setScale(0.5).refreshBody());
        averias.push(this.averiaplanta2= new Averías(this, 520, 298,'printerAnim', 'printer', 0, 8).setScale(0.67).refreshBody());
        averias.push(this.averiaplanta3= new Averías(this, 550, 400,'bookshelfAnim', 'bookshelf', 0, 4).setScale(0.67).refreshBody());
        player1 = new Player(this, 300, 1000, 'robot1', 'stop1');
        player2 = new Player(this, 500, 1000, 'robot2', 'stop2');
        button1 = this.physics.add.staticImage(0, 0, 'interaction').setScale(0.5).setVisible(false).setScale(0.67);
        button2 = this.physics.add.staticImage(0, 0, 'interaction2').setScale(0.5).setVisible(false).setScale(0.67);
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
        keyPeriod.on("down", function(){
            for(let i=0; i<averias.length; i++){  
                if ((player2.x < averias[i].x+85) && (player2.x > averias[i].x-85) && (player2.y > averias[i].y-85) && (player2.y < averias[i].y+20) && averias[i].a==true){
                    cursors.enabled = false; 
                    player2.body.enable = false;   
                    averias[i].a = false;
                    averias[i].body.enable = false;
                    averias[i].anims.play(averias[i].key[1], true);
                    console.log(averias[i].a, averias[i].sprite);
                }
            }
            for(let i=0; i<missions2.length; i++){  
                if ((player2.x < missions2[i].x+85) && (player2.x > missions2[i].x-85) && (player2.y > missions2[i].y-85) && (player2.y < missions2[i].y+120) && (missions2[i].visible==true)){
                    newpos=true;
                    timep2 += 5000;
                }
            }
        });
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
            for(let i=0; i<missions1.length; i++){  
                if ((player1.x < missions1[i].x+85) && (player1.x > missions1[i].x-85) && (player1.y > missions1[i].y-85) && (player1.y < missions1[i].y+120) && (missions1[i].visible==true)){
                    newpos=true;
                    timep1 += 5000;
                }
            }
        });      
        this.style = { font: "30px OCR A", fill: "#000000" };
        text1=this.add.text(50, 25,'Tiempo del J1: ',this.style); 
        text2=this.add.text(600, 25,'Tiempo del J2: ',this.style); 
    }
    update(time, delta){
        text1.setText('Tiempo del J1: ' + Math.round(timep1- time));
        text2.setText('Tiempo del J2: ' + Math.round(timep2- time));

        button1.x=player1.x;
        button1.y=player1.y - 50;
        button1.setVisible(false);
        button2.x=player2.x;
        button2.y=player2.y - 50;
        button2.setVisible(false);

        if(newpos){
            for(let i=0; i<missions1.length; i++){
                missions1[i].setVisible(false);
            }
            for(let i=0; i<missions2.length; i++){
                missions2[i].setVisible(false);
            }
            do{
                var a = Math.round(Phaser.Math.Between(0, missions1.length-1));
                var b= Math.round(Phaser.Math.Between(0,missions2.length-1));
            }while(a==b);
            missions1[a].setVisible(true);
            //missions1.slice(missions1[a],1);
            missions2[b].setVisible(true);
            //missions2.slice(missions1[b],1);
            newpos=false;
        }

        for(let i=0; i<missions1.length; i++){
            if ((player1.x < missions1[i].x+85) && (player1.x > missions1[i].x-85) && (player1.y > missions1[i].y-85) && (player1.y < missions1[i].y+120) && (missions1[i].visible==true)){
                button1.x=player1.x;
                button1.y=player1.y - 50;
                button1.setVisible(true);
            }  
        }

        for(let i=0; i<missions2.length; i++){
            if ((player2.x < missions2[i].x+85) && (player2.x > missions2[i].x-85) && (player2.y > missions2[i].y-85) && (player2.y < missions2[i].y+120) && (missions2[i].visible==true)){
                button2.x=player2.x;
                button2.y=player2.y - 50;
                button2.setVisible(true);
            }  
        }

        //Control of the clouds
        this.children = this.group.getChildren();

        Phaser.Actions.IncXY(this.children, 1, 1);
        Phaser.Actions.WrapInRectangle(this.children, this.rect);

        //console.log(time);
        if (time > timep1){
            this.scene.start('Gamej2');
        }
        if(time > timep2){
            this.scene.start('Gamej1');
        }
        for(let h = 0; h<averias.length; h++){
            if(averias[h].a == true){
                this.cont++;
                console.log(this.cont);
            }if(this.cont == averias.length && time > (this.error - 500)){
                this.scene.start('gameOver');
            }
        }
        this.cont = 0;
         
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

        if (cursors.left.isDown)
        {
            player2.flipX = true;
            player2.setVelocityX(-400);

            player2.anims.play(player2.key[0], true);
        }
        else if (cursors.right.isDown)
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
        if (cursors.up.isDown && player2.body.touching.down)
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
        for(let i=0; i<averias.length; i++){
            if ((player2.x < averias[i].x+85) && (player2.x > averias[i].x-85) && (player2.y > averias[i].y-85) && (player2.y < averias[i].y+20) && averias[i].a==true){
                button2.x=player2.x;
                button2.y=player2.y - 50;
                button2.setVisible(true);
            }
        }
    }
}

