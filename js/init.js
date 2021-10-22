import Game from './Scenes/Game.js';
import Mainmenu from './Scenes/Mainmenu.js';
import Credits from './Scenes/Credits.js';

const config = {
    width: 1600,
    height: 1060,
    type:Phaser.AUTO,
    scene: [Game, Mainmenu, Credits],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
}

const game = new Phaser.Game(config);
