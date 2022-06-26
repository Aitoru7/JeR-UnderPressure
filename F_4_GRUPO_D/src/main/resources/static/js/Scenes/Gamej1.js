export default class Gamej1 extends Phaser.Scene{
    constructor(){
        super({key: 'Gamej1'})
    }

    init(conn){
		this.co = conn.Web;
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){
        this.load.image('gameOver1', 'Assets/gameOverJ2.png');
        this.load.image('menu1', 'Assets/botonMenu.png');
    }

    create(){
        this.add.image(543,359,'gameOver1');

        this.style = { font: "40px OCR A", fill: "#000000" };
        this.add.text(350, 400, 'Volver a jugar?', this.style);

        this.add.image(550,575,'menu1').setScale(1);
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