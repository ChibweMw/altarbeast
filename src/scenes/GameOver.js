export default class GameOver extends Phaser.Scene
{
    constructor()
    {
        super('gameover')
    }
    
    option_RESTART
    option_MENU
    
    create()
    {
        let sceneTitle = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.1, 'tentown', 'Game Over', 48).setOrigin(0.5)
        
        let option_RESTART = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.2, 'tentown', 'Retry', 18).setOrigin(0.5)
        let option_MENU = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.2 + 18, 'tentown', 'Back to Menu', 18).setOrigin(0.5)

    }
}