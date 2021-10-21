import Game from './Scenes/Game.js';
import Mainmenu from './Scenes/Mainmenu.js';

const config = {
    width: 1600,
    height: 1060,
    type:Phaser.AUTO,
    scene: [Game, Mainmenu],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
}

const game = new Phaser.Game(config);