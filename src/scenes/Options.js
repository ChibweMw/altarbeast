import gameOptions from '../game/GameOptions.js'
import UI_Cursor from '../game/UI_Cursor.js'
import UI_Cursor_Controller from '../game/UI_Cursor_Controller.js'

export default class Options extends Phaser.Scene
{
    constructor()
    {
        super('options')
    }

    key_CONFIRM
    key_CANCEL
    key_uiCursor_UP
    key_uiCursor_DOWN
    key_uiCursor_LEFT
    key_uiCursor_RIGHT

    txt_option_Volume
    txt_option_Mute
    txt_closeOptions

    menuSprite_Cursor
    cursor_Input_Controller

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

        // SCENE TITLE
        this.sceneTitleText = this.add.bitmapText(width / 2, height * 0.2, 'tentown', 'OPTIONS', 24).setOrigin(0.5)

        this.txt_option_Volume = this.add.bitmapText(width * 0.5, height * 0.3, 'tentown', `Volume : ${this.sound.volume}`, 12).setOrigin(0.5)
        this.txt_option_Mute = this.add.bitmapText(width * 0.5, height * 0.3 + (18 * 1), 'tentown', `Mute : ${this.sound.mute}`, 12).setOrigin(0.5)

        this.txt_closeOptions = this.add.bitmapText(width * 0.5, height * 0.3 + (18 * 2), 'tentown', 'Back', 12).setOrigin(0.5)
        
        this.menuItems = [this.txt_option_Volume, this.txt_option_Mute, this.txt_closeOptions]
        this.UI_cursorTarget = this.menuItems[0]

        // CURSOR
        this.menuSprite_Cursor = new UI_Cursor(this, width * 0.3, this.UI_cursorTarget.y, 'ui-cursor', 0)
        this.cursor_Input_Controller = new UI_Cursor_Controller(this.menuSprite_Cursor, this.menuItems)
        
        // set initial state
        this.cursor_Input_Controller.setState('idle')

        // SCENE CONTROLS - UnPause, Up/Down navigation
        this.key_CONFIRM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.key_CANCEL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.key_uiCursor_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.key_uiCursor_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        this.key_uiCursor_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.key_uiCursor_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update()
    {
        
        this.uiSettingControl()

        if (Phaser.Input.Keyboard.JustUp(this.key_CANCEL))
        {
            this.scene.stop()
            this.scene.wake(gameOptions.scene_prev)
        }

        this.ui_Nav_Control()
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

    uiSettingControl ()
    {
        switch (gameOptions.UI_cursorTarget)
        {
            case this.txt_option_Mute.text:
                if (Phaser.Input.Keyboard.JustUp(this.key_CONFIRM))
                {
                    console.log('Volume Mute')
                    this.sound.mute = !this.sound.mute
                    this.txt_option_Mute.text = `Mute : ${this.sound.mute}`
                    this.menuSprite_Cursor.playSound_Nav()
                }
                break
            case this.txt_closeOptions.text:
                if (Phaser.Input.Keyboard.JustUp(this.key_CONFIRM))
                {
                    this.scene.stop()
                    this.scene.wake(gameOptions.scene_prev)
                }
                break
            case this.txt_option_Volume.text:
                if (Phaser.Input.Keyboard.JustDown(this.key_uiCursor_LEFT))
                {
                    Phaser.Utils.Array.RotateLeft(gameOptions.global_volume_ranges)
                    this.sound.volume = gameOptions.global_volume_ranges[0]
                    this.txt_option_Volume.text = `Volume : ${this.sound.volume}`
                    this.menuSprite_Cursor.playSound_Nav()

                }
                
                if (Phaser.Input.Keyboard.JustDown(this.key_uiCursor_RIGHT))
                {
                    Phaser.Utils.Array.RotateRight(gameOptions.global_volume_ranges)
                    this.sound.volume = gameOptions.global_volume_ranges[0]
                    this.txt_option_Volume.text = `Volume : ${this.sound.volume}`
                    this.menuSprite_Cursor.playSound_Nav()

                }
                break
            default:
                console.log(`Transitioned to idle`)
                this.UI_cursorTarget = this.menuItems[0]
                gameOptions.UI_cursorTarget = this.UI_cursorTarget.text
        }
    }
}