import Game from './Scenes/Game.js';
import Mainmenu from './Scenes/Mainmenu.js';
import Credits from './Scenes/Credits.js';
import Tutorial from './Scenes/Tutorial.js';
import Intro from './Scenes/Intro.js';

const config = {
    width: 1086,
    height: 720,
    type:Phaser.AUTO,
    scene: [Mainmenu,Game, Credits, Tutorial, Intro ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
}

const game = new Phaser.Game(config);
