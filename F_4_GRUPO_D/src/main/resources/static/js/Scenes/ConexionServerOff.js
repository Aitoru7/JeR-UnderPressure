var global
export default class ConexionServerOff extends Phaser.Scene{
    constructor(){
        super({key: 'ConexionServerOff'})
    }

    init(){
		global = this
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){
        //this.load.image('fondo', 'Assets/desconexionServidor.jpeg');
        //this.load.image('menum', 'Assets/Boton Menu.png');
    }

    create(){
        this.add.image(543,359,'fondod');

        this.style = { font: "40px OCR A", fill: "#000000" };
        this.add.text(350, 400, 'Volver a jugar?', this.style);

        this.add.image(550,575,'menum').setScale(0.8);
    }

    update(){
        if(this.keySpace.isDown){
            this.scene.start('Mainmenu');
        }
    }  
}