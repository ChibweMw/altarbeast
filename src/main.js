import Boot from './scenes/Boot.js'
import Preload from './scenes/Preload.js'
import MainMenu from './scenes/MainMenu.js'
import Game from './scenes/Game.js'
import UI from './scenes/UI.js'
import Pause from './scenes/Pause.js'
import GameOver from './scenes/GameOver.js'
import Options from './scenes/Options.js'

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 240,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: Phaser.Scale.ZOOM_2X
    },
    scene: [Boot, Preload, MainMenu, Game, UI, Pause, GameOver, Options],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: '#000000',
}
const game = new Phaser.Game(config)