export default class Tutorial extends Phaser.Scene{
    constructor(){
        super({key: 'Tutorial'})
    }

    init(){
        this.keySpace =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(){
        this.load.image('blue', 'Assets/player1.png');
        this.load.image('red', 'Assets/player2.png');
        this.load.image('a', 'Assets/Botón A.png');
        this.load.image('w', 'Assets/Botón W.png');
        this.load.image('d', 'Assets/Botón D.png');
        this.load.image('up', 'Assets/Botón Flecha Arriba.png');
        this.load.image('right', 'Assets/Botón Flecha Derecha.png');
        this.load.image('left', 'Assets/Botón Flecha Izquierda.png');
        this.load.image('e', 'Assets/Botón interacción E.png');
        this.load.image('.', 'Assets/Botón interacción ..png');
    }

    create(){
        this.border = this.add.rectangle(550,350,800,600,0xffffff);
        this.content = this.add.rectangle(552,352,750,550,0x000000);
        this.style = { font: "25px Arial", fill: "#FFFFFF" };
        this.controls = this.add.text(200, 100, 'Controles:', this.style);
        this.add.image(400, 200, 'blue');
        this.add.image(700, 200, 'red');
        this.add.image(400, 270, 'w');
        this.add.image(345, 320, 'a');
        this.add.image(455, 320, 'd');
        this.add.image(700, 270, 'up');
        this.add.image(645, 320, 'left');
        this.add.image(755, 320, 'right');
        this.style1 = { font: "15px OCR A", fill: "#FFFFFF" };
        this.instruciones = this.add.text(200, 600, 'Para salir pulsa la barra espaciadora', this.style1);
        this.averias= this.add.text(200, 400, 'Interactuar con averia y tareas: ', this.style);
        this.add.image(400, 500, 'e');
        this.add.image(700, 500, '.');
    }

    update(){
        if(this.keySpace.isDown){
            this.scene.start('Game');
        }
    }

}
