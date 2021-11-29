import Game from './Scenes/Game.js';
import Mainmenu from './Scenes/Mainmenu.js';
import Credits from './Scenes/Credits.js';
import Tutorial from './Scenes/Tutorial.js';
import Intro from './Scenes/Intro.js';
import GameOver from './Scenes/GameOver.js';
import Gamej1 from './Scenes/Gamej1.js';
import Gamej2 from './Scenes/Gamej2.js';
import Online from './Scenes/Online.js';

const config = {
    type:Phaser.AUTO,
    parent: "game",
    width: 1086,
    height: 720,
    dom: {
        createContainer: true
    },
    scene: [Mainmenu, Gamej2, Gamej1, GameOver, Intro,  Credits, Game,  Tutorial, Online],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
}

const videogame = new Phaser.Game(config);
