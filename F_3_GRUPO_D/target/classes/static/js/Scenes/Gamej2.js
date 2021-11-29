export default class Gamej2 extends Phaser.Scene{
    constructor(){
        super({key: 'Gamej2'})
    }

    init(){
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){
        this.load.image('gameOver', 'Assets/Game Over J1.png');
        this.load.image('menu', 'Assets/Botón Menú.png');
    }

    create(){
        this.add.image(543,359,'gameOver');

        this.style = { font: "40px OCR A", fill: "#000000" };
        this.add.text(350, 400, '¿Volver a jugar?', this.style);

        this.add.image(550,575,'menu').setScale(0.3);
    }

    update(){
        if(this.keySpace.isDown){
            this.scene.start('Mainmenu');
        }
    }
    
}