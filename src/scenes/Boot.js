export default class Boot extends Phaser.Scene
{
    constructor()
    {
        super('boot')
    }

    preload()
    {
        this.load.bitmapFont('tentown', '../../assets/fonts/tentown_0.png', '../../assets/fonts/tentown.xml')
        
        this.load.on('complete', this.complete, this)
    }

    complete()
    {
        this.scene.start('preload')
    }
}