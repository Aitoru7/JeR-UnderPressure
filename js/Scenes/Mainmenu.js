export default class Mainmenu extends Phaser.Scene{
    constructor(){
        super({key: 'Mainmenu'})
    }
    init(){
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.vez= 0;
    }

    preload(){
        this.load.image('sky0', 'Assets/Fondo día.png');
        this.load.image('sky1', 'Assets/Fondo anochecer.png');
        this.load.image('sky2', 'Assets/Fondo atardecer.png');
        this.load.image('sky3', 'Assets/Fondo noche.png');
        this.load.image('ground', 'Assets/Plataforma P0.png');
        this.load.image('cloud', 'Assets/nube.png');
        this.load.image('title', 'Assets/Titulo.png');
        this.load.image('play', 'Assets/Botón Jugar.png');
        this.load.image('credits', 'Assets/Botón Creditos.png');
        this.load.image('front', 'Assets/Edificios foreground.png');
        this.load.image('back', 'Assets/Edificios background.png');
        this.load.audio('pressure', 'Assets/Music/under pressure.mp3');

        this.load.spritesheet('robotA', 'Assets/andar-sheet.png', { frameWidth: 40, frameHeight: 50 });
        this.load.spritesheet('robotB', 'Assets/andar-sheet1.png', { frameWidth: 40, frameHeight: 50 });
    }
    create(){
        this.song = this.sound.add('pressure');
        this.song.play();
        //alert('porfavor funciona2');
        // Game background
        this.add.image(500, 400, 'sky0').setScale(0.8);
        
        //This create the place where the clouds are going to be
        this.rect = new Phaser.Geom.Rectangle(0, 0, 1086, 720);
        //Here we inicialite the group of clouds
        this.group = this.add.group({ key: 'cloud', frameQuantity: 15 });
        //And this initialite the cloud in the exact are
        Phaser.Actions.RandomRectangle(this.group.getChildren(), this.rect);

        //Here we create the efect of movement of the backgournd
        this.back = this.add.tileSprite(0, -100, 0, 0, 'back')
        .setOrigin(0, 0).setScale(0.8);
        this.floor = this.add.rectangle(600,1000,1200, 1000,0x555555);
        this.front = this.add.tileSprite(0, -100, 1086, 0, 'front')
        .setOrigin(0, 0).setScale(0.7);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();

        this.title = this.add.image(550,-200, "title").setScale(0.5);

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.platforms.create(500, 710, 'ground').refreshBody().setScale(2);

        //Configuratión of the animation
        const animConfig = {
            key: 'walk',
            frames: this.anims.generateFrameNumbers('robotA', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        };
        const animConfig1 = {
            key: 'walk1',
            frames: this.anims.generateFrameNumbers('robotB', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        };
        this.anims.create(animConfig);
        this.anims.create(animConfig1);
        
        // The player and its settings
        const sprite = this.add.sprite(400, 650, 'robotA', 'frame_0000').setScale(2);
        const sprite1 = this.add.sprite(700, 650, 'robotB', 'frame_0000').setScale(2);
        //player = this.physics.add.sprite(600, 450, 'robotA').setScale(3);
        sprite.play('walk');
        sprite1.play('walk1');

        sprite.flipX=true;
        sprite1.flipX=true;

        this.backRectangle = this.add.rectangle(-100,-100,175,150,0x000000);
        this.play=this.add.image(-100,-100,'play').setScale(0.2);
        this.credits=this.add.image(-100,-100,'credits').setScale(0.2);
        this.instruciones = this.add.text(-100, -100, '<--  -->', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    }

    update(){
        //Part of the update for the clouds
        this.children = this.group.getChildren();

        Phaser.Actions.IncXY(this.children, 1, 1);
        Phaser.Actions.WrapInRectangle(this.children, this.rect);

        this.back.tilePositionX -= 2;
        this.front.tilePositionX -= 6;

        if(this.title.y < 200){
            this.title.y=this.title.y + 3;
        }else if(this.vez==0){
            this.backRectangle.x=400; this.backRectangle.y=400;
            this.instruciones.x=370; this.instruciones.y=455;
            this.play.x=400; this.play.y=400;
            this.credits.x=700; this.credits.y=400;
            this.vez++;
        }

        if (this.cursors.left.isDown){
            this.backRectangle.x=400; 
            this.instruciones.x=370;
        }
        if (this.cursors.right.isDown ){
            this.backRectangle.x=700;
            this.instruciones.x=670;
        }

        if(this.backRectangle.x==400 && this.keySpace.isDown){
            this.scene.start('Intro');
        }else if(this.backRectangle.x==700 && this.keySpace.isDown){
            this.scene.start('Credits');
        }
    }
}
