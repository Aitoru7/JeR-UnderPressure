export default class Credits extends Phaser.Scene{
    constructor(){
        super({key: 'Credits'})
    }

    init(){
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){
        this.load.spritesheet('logo', 'Assets/logo-sheet.png', { frameWidth: 515, frameHeight: 468 });
        this.load.image('stop', 'Assets/LOGO.png');
    }

    create(){
        this.style = { font: "15px Arial", fill: "#FFFFFF" };
        this.instruciones = this.add.text(10, 10, 'Para salir pulsa la barra espaciadora', this.style);
        this.style1 = { font: "30px Arial", fill: "#FFFFFF" };
        this.empiece = this.add.text(275, 150, 'Creadores, diseñadores y programadores: ', this.style1);
        this.nosotros = this.add.text(325, 200, '-> Jesús Culebras González \n-> Aitor Lebrero Barroso \n-> Marcos Toledo Sanchez ', this.style1);

        /*
        const animConfig = {
            key: 'animation',
            frames: this.anims.generateFrameNumbers('logo', { start: 0, end: 36 }),
            frameRate: 20,
            repeat: 0
        };
        this.anims.create(animConfig);

        const logo = this.add.sprite(0, 0, 'logo','frame_0000');
        logo.play('animation');
        */

        this.stop=this.add.image(500,500,'stop');
    }


    update(){
        if(this.keySpace.isDown){
            this.scene.start('Mainmenu');
        }
    }
}
