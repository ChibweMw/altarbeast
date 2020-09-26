export default class GameOver extends Phaser.Scene
{
    constructor()
    {
        super('gameover')
    }

    key_CONFIRM
    key_uiCursor_UP
    key_uiCursor_DOWN
    
    sceneRestartText
    sceneReturnToMainMenuText

    menuSprite_Cursor
    UI_cursorTarget
    menuItems = []
    
    create()
    {
        const width = this.scale.width
        const height = this.scale.height
        
        // SCENE OVERLAY GRAPHIC

        const overlay = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0x000000,
                alpha: 0.6
            }
        })
        overlay.fillRect(0, 0, width, height)
        // SCENE TEXT
        this.sceneTitleText = this.add.bitmapText(width / 2, height * 0.2, 'tentown', 'Game Over', 24).setOrigin(0.5)
        
        this.sceneRestartText = this.add.bitmapText(width / 2, height * 0.3 + (18 * 1), 'tentown', 'Retry', 12).setOrigin(0.5)
        this.sceneReturnToMainMenuText = this.add.bitmapText(width / 2, height * 0.3 + (18 * 2), 'tentown', 'Main Menu', 12).setOrigin(0.5)
        
        this.menuItems = [this.sceneRestartText, this.sceneReturnToMainMenuText]
        this.UI_cursorTarget = this.menuItems[0]

        // SCENE MENU CURSOR IMAGE
        this.menuSprite_Cursor = this.add.sprite(width * 0.3, this.UI_cursorTarget.y, 'ui-cursor', 0).setOrigin(1, 0.75)

        // SCENE CONTROLS - UnPause, Up/Down navigation
        this.key_CONFIRM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.key_uiCursor_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.key_uiCursor_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(this.key_CONFIRM))
        {
            switch (this.UI_cursorTarget.text)
            {
                case this.sceneRestartText.text:
                    // console.log(`SELECTED: ${this.sceneRestartText.text}`)
                    // console.log(`RESTART GAME SCENE`)
                    this.scene.start('game')
                    break
                case this.sceneReturnToMainMenuText.text:
                    // console.log(`SELECTED: ${this.sceneReturnToMainMenuText.text}`)                    
                    // console.log(`Back to menu button hit`)
                    this.scene.stop('ui')
                    this.scene.stop('game')
                    this.scene.start('menu-main')
                    break
                default:
                    console.log(`nothing selected, pick something`)
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.key_uiCursor_UP))
        {
            Phaser.Utils.Array.RotateRight(this.menuItems)
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.key_uiCursor_DOWN))
        {
            Phaser.Utils.Array.RotateLeft(this.menuItems)
        }

        this.UI_cursorTarget = this.menuItems[0]

        this.menuSprite_Cursor.y = this.UI_cursorTarget.y

    }
}