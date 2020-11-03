export default class UI extends Phaser.Scene
{
    constructor()
    {
        super('ui')

        this.data
    }

    init (data)
    {
        this.data = data // reference to the GAME scene
    }

    create()
    {
        this.loadingText = this.add.bitmapText(5, 5, 'tentown', `${this.data.gameScene.player.HP}`, 12)
    }

    update()
    {
        this.loadingText.setText(`${this.data.gameScene.player.HP}`)
    }
}