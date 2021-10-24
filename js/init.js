import Game from './Scenes/Game.js';
import Mainmenu from './Scenes/Mainmenu.js';
import Credits from './Scenes/Credits.js';

const config = {
    width: 1086,
    height: 720,
    type:Phaser.AUTO,
    scene: [Game, Credits, Mainmenu],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
}

const game = new Phaser.Game(config);
