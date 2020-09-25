export default class Pause extends Phaser.Scene
{
    constructor()
    {
        super('pause')
    }

    key_PAUSE
    key_PAUSE_UP
    key_RESTART
    key_MENU
    sceneTitleText
    menuSprite_Cursor

    init ()
    {
        this.key_PAUSE_UP = false
    }

    create ()
    {
        this.sceneTitleText = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.2, 'tentown', 'PAUSED', 24).setOrigin(0.5)
        this.sceneRestartText = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.3, 'tentown', 'Resume (P)', 12).setOrigin(0.5)
        this.sceneRestartText = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.3 + (14 * 1), 'tentown', 'Retry (R)', 12).setOrigin(0.5)
        this.sceneRestartText = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.3 + (14 * 2), 'tentown', 'Main Menu (M)', 12).setOrigin(0.5)
        this.menuSprite_Cursor = this.add.sprite(this.game.scale.width * 0.3, this.game.scale.height * 0.3 - 12, 'ui-cursor', 0).setOrigin(0)
        // SCENE CONTROLS - UnPause
        this.key_PAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)

        // DEV COMMANDS        
        this.key_RESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.key_MENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.key_RESTART.once('down', () => {
            console.log(`RESTART GAME SCENE`)
            this.scene.start('game')
        })        

        this.key_MENU.once('down', () => {
            console.log(`Back to menu button hit`)
            this.scene.stop('ui')
            this.scene.stop('game')
            this.scene.start('menu-main')
        })
    }
    
    update()
    {
        if (this.key_PAUSE_UP)
        {
            // console.log('Can UnPAUSE')
            if (Phaser.Input.Keyboard.JustDown(this.key_PAUSE))
            {
                // console.log('UnPAUSEing')
                this.scene.stop()
                this.scene.resume('game')
            }
        }
        else 
        {
            // console.log('Waiting on Pause button release')
            if (Phaser.Input.Keyboard.JustUp(this.key_PAUSE))
            {
                // console.log('Initial Release to Allow UnPausing')
                this.key_PAUSE_UP = true
            }
        }
    }
}