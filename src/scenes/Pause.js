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

    sceneResumeText
    sceneRestartText
    sceneReturnToMainMenuText

    menuSprite_Cursor
    UI_cursorTarget
    menuItems = []

    init ()
    {
        this.key_PAUSE_UP = false
    }
    
    create ()
    {
        // SCENE TITLE
        this.sceneTitleText = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.2, 'tentown', 'PAUSED', 24).setOrigin(0.5)
        
        // SCENE MENU TEXT
        this.sceneResumeText = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.3, 'tentown', 'Resume (P)', 12).setOrigin(0.5)
        this.sceneRestartText = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.3 + (14 * 1), 'tentown', 'Retry (R)', 12).setOrigin(0.5)
        this.sceneReturnToMainMenuText = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.3 + (14 * 2), 'tentown', 'Main Menu (M)', 12).setOrigin(0.5)
        
        this.menuItems = [this.sceneResumeText, this.sceneRestartText, this.sceneReturnToMainMenuText]
        this.UI_cursorTarget = this.menuItems[0]
        
        // SCENE MENU CURSOR IMAGE
        this.menuSprite_Cursor = this.add.sprite(this.game.scale.width * 0.3, this.UI_cursorTarget.y, 'ui-cursor', 0).setOrigin(1, 0.75)
        
        // SCENE CONTROLS - UnPause, Up/Down navigation
        this.key_CONFIRM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.key_uiCursor_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.key_uiCursor_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        // DEV COMMANDS        
        this.key_RESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.key_MENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.key_RESTART.once('down', () => {
            
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
        if (Phaser.Input.Keyboard.JustDown(this.key_CONFIRM))
        {
            switch (this.UI_cursorTarget.text)
            {
                case this.sceneResumeText.text:
                    console.log(`SELECTED: ${this.sceneResumeText.text}`)
                    
                        console.log('UnPAUSEing')
                        this.scene.stop()
                        this.scene.resume('game')
                    
                    break
                case this.sceneRestartText.text:
                    console.log(`SELECTED: ${this.sceneRestartText.text}`)
                    
                        console.log(`RESTART GAME SCENE`)
                        this.scene.start('game')
                    
                    break
                case this.sceneReturnToMainMenuText.text:
                    console.log(`SELECTED: ${this.sceneReturnToMainMenuText.text}`)
                    
                        console.log(`Back to menu button hit`)
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
            console.log(`menu items: ${this.menuItems}`)
            console.log(`cursor up: ${this.UI_cursorTarget.text}`)
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.key_uiCursor_DOWN))
        {
            Phaser.Utils.Array.RotateLeft(this.menuItems)
            console.log(`menu items: ${this.menuItems}`)
            console.log(`cursor down: ${this.UI_cursorTarget.text}`)
        }

        this.UI_cursorTarget = this.menuItems[0]

        this.menuSprite_Cursor.y = this.UI_cursorTarget.y

    }
}