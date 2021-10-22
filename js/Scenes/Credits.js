export default class Credits extends Phaser.Scene{
    constructor(){
        super({key: 'Credits'})
    }

    init(){
        this.keyEnter =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    preload(){

    }

    create(){
    }

    update(){
        if(this.keyEnter.isDown){
            this.scene.start('Mainmenu');
        }
    }
}