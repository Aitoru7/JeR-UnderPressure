export default class Gamej2 extends Phaser.Scene{
    constructor(){
        super({key: 'Gamej2'})
    }

    init(conn){
		this.co = conn.Web;
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){
        this.load.image('gameOver2', 'Assets/gameOverJ1.png');
        this.load.image('menu2', 'Assets/botonMenu.png');
    }

    create(){
        this.add.image(543,359,'gameOver2');

        this.style = { font: "40px OCR A", fill: "#000000" };
        this.add.text(350, 400, 'Volver a jugar?', this.style);

        this.add.image(550,575,'menu2').setScale(1);
    }

    update(){
		if(this.co.readyState === this.co.CLOSED){
			global.scene.start('ConexionServerOff');	
		}
        if(this.keySpace.isDown){
			this.co.close();
            this.scene.start('Mainmenu');
        }
    }
    
}