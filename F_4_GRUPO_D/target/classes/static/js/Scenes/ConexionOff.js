var global
export default class ConexionOff extends Phaser.Scene{
    constructor(){
        super({key: 'ConexionOff'})
    }

    init(conn){
		global = this
		this.co = conn.Web;
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){
        //this.load.image('fondo', 'Assets/Conexion Off.jpeg');
        //this.load.image('menum', 'Assets/Boton Menu.png');
    }

    create(){
        this.add.image(543,359,'fondo');

        this.style = { font: "40px OCR A", fill: "#000000" };
        this.add.text(350, 400, 'Volver a jugar?', this.style);

        this.add.image(550,575,'menum').setScale(1);
    }

    update(){
		if(this.co.readyState === this.co.CLOSED){
			global.scene.start('ConexionServerOff');			
		}
        if(this.keySpace.isDown){
            this.scene.start('Mainmenu');
        }
    }  
}