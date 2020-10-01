import gameOptions from '../game/GameOptions.js'

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

    menuItems = []


    create()
    {
        const width = this.scale.width
        const height = this.scale.height

        console.log(`Main Menu Entered`)
        this.add.image(this.game.scale.width / 2, this.game.scale.height / 2, 'logo')
        
        // MENU TEXT
        this.menuText_Start = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.8, 'tentown', 'Start Game', 12).setOrigin(0.5)
        this.menuText_Options = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.8 + (18 * 1), 'tentown', 'Options', 12).setOrigin(0.5)
        
        this.menuItems = [this.menuText_Start, this.menuText_Options]
        this.UI_cursorTarget = this.menuItems[0]
        
        // CURSOR
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
                case this.menuText_Start.text:
                    console.log('Got to Game Scene')
                    this.scene.start('game')
                    break
                case this.menuText_Options.text:
                    console.log(`Go to OPTIONS SCENE`)
                    gameOptions.scene_prev = this.scene.key
                    this.scene.switch('options')
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