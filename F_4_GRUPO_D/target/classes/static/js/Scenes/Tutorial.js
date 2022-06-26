var volver;
var volver2;
var global;
var co;
export default class Tutorial extends Phaser.Scene{
    constructor(){
        super({key: 'Tutorial'})
    }

    init(conn){
		global = this;
		volver = false;
		volver2 = false;
		co=conn.Web;
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){
        this.load.image('blue', 'Assets/player1.png');
        this.load.image('red', 'Assets/player2.png');
        this.load.image('a', 'Assets/botonInteraccionA.png');
        this.load.image('w', 'Assets/botonInteraccionW.png');
        this.load.image('d', 'Assets/botonInteraccionD.png');
        
        this.load.image('e', 'Assets/botonInteraccionE.png');
        this.load.image('.', 'Assets/botonInteraccionPunto.png');
    }

    create(){
		co.onmessage = function(msg) {
			if(msg.data == "Desconexion"){
				global.scene.start('ConexionOff' , { Web: co });
			}else{
				console.log("WS message: " + msg.data);
		        var message = JSON.parse(msg.data)
		        if(message.name=="D"){
		            console.log("Aqui estamos");
		            volver=true;
		        }
		        if(message.name=="E"){
					volver2=true;
				}
			}
		}
		this.border = this.add.rectangle(550,350,800,600,0xffffff);
        this.content = this.add.rectangle(552,352,750,550,0x000000);
        this.style = { font: "25px OCR A EXTENDED", fill: "#FFFFFF" };
        this.controls = this.add.text(200, 100, 'Controles:', this.style);
        this.add.image(550, 150, 'blue');
        //this.add.image(700, 200, 'red');
        this.add.image(550, 220, 'w');
        this.add.image(495, 270, 'a');
        this.add.image(605, 270, 'd');
        //this.add.image(700, 270, 'up');
        //this.add.image(645, 320, 'left');
        //this.add.image(755, 320, 'right');
        this.style1 = { font: "20px OCR A EXTENDED", fill: "#FFFFFF" };
        this.instruciones = this.add.text(200, 550, 'Para continuar pulsa la barra espaciadora', this.style1);
        this.averias= this.add.text(200, 370, 'Interactuar con averia y tareas: ', this.style);
        this.add.image(550, 470, 'e');
        //this.add.image(700, 500, '.');
    } 
    update(){
		if(co.readyState === co.CLOSED){
			global.scene.start('ConexionServerOff');	
		}
       if(this.keySpace.isDown){
		var msg = {
			name : 'D',
		}
		co.send(JSON.stringify(msg));
		}
        if((this.keySpace.isDown && volver) || volver2){
			var msg = {
			name : 'E',
		}
		co.send(JSON.stringify(msg));
		this.scene.start('Game', { Web: co });
        } 
    }
}
