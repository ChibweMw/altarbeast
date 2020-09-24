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
    scene: [MainMenu],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#000000'
}
const game = new Phaser.Game(config)

console.log('Haunted Sakura Altar');