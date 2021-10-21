export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, sprite2) {
        super(scene, x, y, sprite, sprite2); 
        this.sprite=sprite;
        this.sprite2=sprite2;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.init();
        this.animatePlayer();
    
    }

    init(){
        this
        .setBounce(0.2)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        this.key=['l','t'];
    }

    animatePlayer() {
        this.anims.create({
            key: this.key[0],
            frames: this.anims.generateFrameNumbers(this.sprite, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1

        });

        this.anims.create({
            key: this.key[1],
            frames: [{ key: this.sprite2, frame: 4 }],
            frameRate: 20,

        });
    }
}