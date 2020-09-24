import Boot from './scenes/Boot.js'
import Preload from './scenes/Preload.js'
import MainMenu from './scenes/MainMenu.js'

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
    scene: [Boot, Preload, MainMenu],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#000000'
}
const game = new Phaser.Game(config)