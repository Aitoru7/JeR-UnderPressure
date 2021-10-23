export default class Credits extends Phaser.Scene{
    constructor(){
        super({key: 'Credits'})
    }

    init(){
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){

    }

    create(){
        this.style = { font: "30px Arial", fill: "#FFFFFF" };
        this.instruciones = this.add.text(0, 0, 'Para salir pulse la barra espaciadora', this.style);
        this.style1 = { font: "50px Arial", fill: "#FFFFFF" };
        this.empiece = this.add.text(300, 150, 'Creadores, diseñadores y programadores: ', this.style1);
        this.nosotros = this.add.text(350, 250, '-> Jesús Culebras González \n-> Aitor Lebrero Barroso \n-> MArcos Toledo Sanchez ', this.style1);
    }

    update(){
        if(this.keySpace.isDown){
            this.scene.start('Mainmenu');
        }
    }
}
