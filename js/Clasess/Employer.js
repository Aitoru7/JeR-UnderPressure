export default class Employer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, sprite2) {
        super(scene, x, y, sprite, sprite2); 
        this.sprite=sprite;
        this.sprite2=sprite2;
        this.scene = scene;
        this.scene.add.existing(this);

        this.animateFault();
    }

    animateFault(){
        this.anims.create({
            key: 'l',
            frames: this.anims.generateFrameNumbers(this.sprite, { start:  Math.round(Math.random() * (7 - 0) + 0), end: 7 }),
            frameRate: 2,
            repeat: -1,
        });
    } 
}