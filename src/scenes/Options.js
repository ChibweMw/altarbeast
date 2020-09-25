export default class Options extends Phaser.Scene
{
    constructor()
    {
        super('options')
    }

    create()
    {
        let sceneTitleText = this.add.bitmapText(0, 0, 'tentown', 'Options', 48)
    }
}