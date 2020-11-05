import gameOptions from '../game/GameOptions.js'
import UI_Cursor from '../game/UI_Cursor.js'
import UI_Cursor_Controller from '../game/UI_Cursor_Controller.js'

export default class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super('menu-main')
    }
    
    key_CONFIRM
    key_uiCursor_UP
    key_uiCursor_DOWN

    menuText_Start
    menuText_Options

    menuSprite_Cursor
    cursor_Input_Controller

    menuItems = []


    create()
    {
        // GET VOLUME 
        // this.sound.play('main-game-theme')
        const width = this.scale.width
        const height = this.scale.height

        console.log(`Main Menu Entered`)
        this.add.image(this.game.scale.width / 2, this.game.scale.height / 2, 'logo')
        // this.add.image(this.game.scale.width / 2, this.game.scale.height / 2, 'logo').setScale(0.5)

        
        // MENU TEXT
        this.menuText_Start = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.8, 'tentown', 'Start Game', 12).setOrigin(0.5)
        this.menuText_Options = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.8 + (18 * 1), 'tentown', 'Options', 12).setOrigin(0.5)
        
        this.menuItems = [this.menuText_Start, this.menuText_Options]
        this.UI_cursorTarget = this.menuItems[0]
        
        // CURSOR
        this.menuSprite_Cursor = new UI_Cursor(this, width * 0.3, this.UI_cursorTarget.y, 'ui-cursor', 0)
        this.cursor_Input_Controller = new UI_Cursor_Controller(this.menuSprite_Cursor, this.menuItems)
        
        // set initial state
        this.cursor_Input_Controller.setState('idle')
        
        // SCENE CONTROLS - UnPause, Up/Down navigation
        this.key_CONFIRM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
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
        switch (gameOptions.UI_cursorTarget)
        {
            case this.menuText_Start.text:
                if (Phaser.Input.Keyboard.JustUp(this.key_CONFIRM))
                {
                    console.log('Got to Game Scene')
                    this.scene.start('game')
                }
                break
            case this.menuText_Options.text:
                if (Phaser.Input.Keyboard.JustUp(this.key_CONFIRM))
                {
                    console.log(`Go to OPTIONS SCENE`)
                    gameOptions.scene_prev = this.scene.key
                    this.scene.switch('options')
                }
                break
            default:
                this.UI_cursorTarget = this.menuItems[0]
                gameOptions.UI_cursorTarget = this.UI_cursorTarget.text
                console.log(`SELECTION : ${gameOptions.UI_cursorTarget}`)
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