export default class Preload extends Phaser.Scene
{
    constructor()
    {
        super('preload')
    }

    init()
    {

    }

    preload()
    {
        this.load.image('logo', '../../assets/sprites/branding/logo.png')
        this.load.on('complete', this.complete, this)

    }

    complete () {
        console.log(`COMPLETE!`)
        this.scene.start('menu-main')
    }
}