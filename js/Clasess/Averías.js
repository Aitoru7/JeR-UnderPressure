//import Player from "./Player";
export default class Averías extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, sprite2, n1,n2) {
        super(scene, x, y, sprite, sprite2, n1, n2); 
        this.n1 = n1;
        this.n2 = n2;
        this.sprite=sprite;
        this.sprite2=sprite2;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.init();
        this.animateFault();
        //this.interaction(this.player);
    
    }

    init(){
        this.setCollideWorldBounds(true)
        this.setGravityY(300)
        this.key=['na','a']
        this.a=false;
    }

    animateFault(){
        this.anims.create({
            key: this.key[0],
            frames: this.anims.generateFrameNumbers(this.sprite, { start: this.n1, end: this.n2 }),
            frameRate: 10,
            repeat: 0,
        });

        this.anims.create({
            key: this.key[1],
            frames: [ { key: this.sprite2 } ],
            frameRate: 20
        });
    }

   /* intetraction(player){
    }*/
    
}