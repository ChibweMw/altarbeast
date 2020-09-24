export default class UI extends Phaser.Scene
{
    constructor()
    {
        super('ui')
    }

    create()
    {
        this.loadingText = this.add.bitmapText(5, 5, 'tentown', 'UI Scene', 12)
    }
}