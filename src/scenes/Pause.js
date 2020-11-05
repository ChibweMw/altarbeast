import gameOptions from '../game/GameOptions.js'
import UI_Cursor from '../game/UI_Cursor.js'
import UI_Cursor_Controller from '../game/UI_Cursor_Controller.js'

export default class Pause extends Phaser.Scene
{
    constructor()
    {
        super('pause')
    }

    key_CONFIRM
    key_UNPAUSE
    key_uiCursor_UP
    key_uiCursor_DOWN

    sceneTitleText

    sceneResumeText
    sceneRestartText
    sceneReturnToMainMenuText

    menuSprite_Cursor
    cursor_Input_Controller

    UI_cursorTarget
    menuItems = []
    
    create ()
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

        // SCENE TITLE
        this.sceneTitleText = this.add.bitmapText(width / 2, height * 0.2, 'tentown', 'PAUSED', 24).setOrigin(0.5)
        
        // SCENE MENU TEXT
        this.sceneResumeText = this.add.bitmapText(width / 2, height * 0.3, 'tentown', 'Resume', 12).setOrigin(0.5)
        this.sceneRestartText = this.add.bitmapText(width / 2, height * 0.3 + (18 * 1), 'tentown', 'Retry', 12).setOrigin(0.5)
        this.sceneOptionsMenuText = this.add.bitmapText(width / 2, height * 0.3 + (18 * 2), 'tentown', 'Options', 12).setOrigin(0.5)
        this.sceneReturnToMainMenuText = this.add.bitmapText(width / 2, height * 0.3 + (18 * 3), 'tentown', 'Main Menu', 12).setOrigin(0.5)
        
        this.menuItems = [this.sceneResumeText, this.sceneRestartText, this.sceneOptionsMenuText, this.sceneReturnToMainMenuText]
        this.UI_cursorTarget = this.menuItems[0]
        
        // SCENE MENU CURSOR IMAGE
        this.menuSprite_Cursor = new UI_Cursor(this, width * 0.3, this.UI_cursorTarget.y, 'ui-cursor', 0) //this.add.sprite(width * 0.3, this.UI_cursorTarget.y, 'ui-cursor', 0).setOrigin(1, 0.75)
        this.cursor_Input_Controller = new UI_Cursor_Controller(this.menuSprite_Cursor, this.menuItems)

        // set initial state
        this.cursor_Input_Controller.setState('idle')

        // SCENE CONTROLS - UnPause, Up/Down navigation
        this.key_CONFIRM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        //key_UNPAUSE
        this.key_UNPAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)

        this.key_uiCursor_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.key_uiCursor_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

    }
    
    update()
    {
        this.uiConfirm()
        this.ui_Nav_Control()
    }

    uiConfirm()
    {
        if (Phaser.Input.Keyboard.JustUp(this.key_CONFIRM) || (Phaser.Input.Keyboard.JustUp(this.key_UNPAUSE) && gameOptions.UI_cursorTarget === this.sceneResumeText.text))
        {
            switch (gameOptions.UI_cursorTarget)
            {
                case this.sceneResumeText.text:
                    this.scene.stop()
                    this.scene.resume('game')
                    break
                case this.sceneRestartText.text:
                    this.scene.start('game')
                    break
                case this.sceneOptionsMenuText.text:
                    gameOptions.scene_prev = this.scene.key
                    this.scene.switch('options')
                    break
                case this.sceneReturnToMainMenuText.text:
                    this.scene.stop('ui')
                    this.scene.stop('game')
                    this.scene.start('menu-main')
                    break
                default:
                    console.log(`nothing selected, pick something`)
            }
        }
    }

    ui_Nav_Control()
    {
        if (Phaser.Input.Keyboard.JustDown(this.key_uiCursor_UP))
        {
            this.cursor_Input_Controller.setState('up')
        } else if (Phaser.Input.Keyboard.JustDown(this.key_uiCursor_DOWN))
        {
            this.cursor_Input_Controller.setState('down')
        } else 
        {
            this.cursor_Input_Controller.setState('idle')
        }
    }
}