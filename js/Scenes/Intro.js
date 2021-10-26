export default class Intro extends Phaser.Scene{
    constructor(){
        super({key: 'Intro'})
    }

    init(){
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){
        this.load.image('sky', 'Assets/Fondo día.png');
        this.load.image('stop1', 'Assets/player1.png');
        this.load.image('stop2', 'Assets/player2.png');
        this.load.image('cloud', 'Assets/nube.png');
        this.load.image('building', 'Assets/Edificio.png');
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
        this.load.spritesheet('employee', 'Assets/trabajador-sheet.png', { frameWidth: 56, frameHeight: 64 });
        this.load.spritesheet('robotA', 'Assets/andar-sheet.png', { frameWidth: 40, frameHeight: 50 });
        this.load.spritesheet('robotB', 'Assets/andar-sheet1.png', { frameWidth: 40, frameHeight: 50 });
    }

    create(){
        // Game background
        this.add.image(500, 400, 'sky').setScale(0.8);

        //This create the place where the clouds are going to be
        this.rect = new Phaser.Geom.Rectangle(0, 0, 1086, 720);
        //Here we inicialite the group of clouds
        this.group = this.add.group({ key: 'cloud', frameQuantity: 15 });
        //And this initialite the cloud in the exact are
        Phaser.Actions.RandomRectangle(this.group.getChildren(), this.rect);

        this.platforms = this.physics.add.staticGroup();
        this.wallpaper = this.physics.add.staticImage(543, 405, 'building').setScale(0.68);
        this.platforms.create(540, 100, 'ceiling').setScale(0.7).refreshBody();
        this.platforms.create(509, 185, 'separator1').setScale(0.7).refreshBody();
        this.platforms.create(512, 387, 'separator2').setScale(0.7).refreshBody();
        this.platforms.create(700, 341, 'platform2C').setScale(0.83).refreshBody();
        this.platforms.create(35, 341, 'platform2L').setScale(0.83).refreshBody();
        this.platforms.create(5, 245, 'wall1').setScale(0.7).refreshBody();
        this.platforms.create(1077, 244, 'wall1').setScale(0.7).refreshBody();
        this.platforms.create(47, 445, 'wall1').setScale(0.63).refreshBody();
        this.platforms.create(1067, 445, 'wall1').setScale(0.63).refreshBody();
        this.platforms.create(651, 545, 'platform1C').setScale(0.83).refreshBody();
        this.platforms.create(88, 545, 'platform1L').setScale(0.83).refreshBody();
        this.platforms.create(141, 635, 'wall0').setScale(2.74).refreshBody();
        this.platforms.create(1000, 635, 'wall0').setScale(2.74).refreshBody();
        this.platforms.create(651, 715, 'platform0').setScale(0.83).refreshBody();
        this.paint= this.add.image(579,230,'paint');
        this.employee= this.physics.add.staticSprite(585, 655, 'employee', 'frame_0000');
        this.add.image (300, 680, 'plant').setScale(0.5);
        this.add.image (520,300, 'printer').setScale(0.67);
        this.add.image (550,500, 'bookshelf').setScale(0.67);

        //Configuratión of the animation
        const animConfig = {
            key: 'walk',
            frames: this.anims.generateFrameNumbers('robotA', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 18
        };
        const animConfig1 = {
            key: 'walk1',
            frames: this.anims.generateFrameNumbers('robotB', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 18
        };
        this.anims.create(animConfig);
        this.anims.create(animConfig1);
        
        // The player and its settings
        this.sprite = this.add.sprite(600, 690, 'robotA', 'stop1');
        this.sprite1 = this.add.sprite(450, 690, 'robotB', 'stop2');
        //player = this.physics.add.sprite(600, 450, 'robotA').setScale(3);
        this.sprite.play('walk');
        this.sprite1.play('walk1');

        this.sprite.flipX=true;

        this.add.rectangle(540,150,1000,225,0xffffff);
        this.add.rectangle(540,150,975,200,0x000000);

        this.style = { font: "35px OCR A", fill: "#FFFFFF" };
        this.add.text(75, 100, 'Hoy comenzamos una nueva jornada de trabajo. \nA ver con que sorpresas nos encontramos :D', this.style);
        this.style1 = { font: "15px OCR A", fill: "#FFFFFF" };
        this.add.text(100, 200, 'Para continuar pulsa la barra espaciadora', this.style1);
    }

    update(){
        if(this.sprite.x>200){
            this.sprite.x--;
        }
        if(this.sprite1.x<900){
            this.sprite1.x++;
        }
        //Part of the update for the clouds
        this.children = this.group.getChildren();

        Phaser.Actions.IncXY(this.children, 1, 1);
        Phaser.Actions.WrapInRectangle(this.children, this.rect);

        if(this.keySpace.isDown){
            this.scene.start('Game');
        }
    }
}
