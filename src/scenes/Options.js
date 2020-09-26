export default class Options extends Phaser.Scene
{
    constructor()
    {
        super('options')
    }

    key_CONFIRM
    key_uiCursor_UP
    key_uiCursor_DOWN

    txt_option_Volume
    txt_toMainMenu

    menuSprite_Cursor
    UI_cursorTarget
    menuItems = []

    create()
    {
        const width = this.scale.width
        const height = this.scale.height

        // SCENE TITLE
        this.sceneTitleText = this.add.bitmapText(width / 2, height * 0.2, 'tentown', 'OPTIONS', 24).setOrigin(0.5)

        this.txt_option_Volume = this.add.bitmapText(width / 2, height * 0.3, 'tentown', 'Volume', 12).setOrigin(0.5)
        this.txt_toMainMenu = this.add.bitmapText(width / 2, height * 0.3 + (18 * 1), 'tentown', 'Main Menu', 12).setOrigin(0.5)
        
        this.menuItems = [this.txt_option_Volume, this.txt_toMainMenu]
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
                case this.txt_option_Volume.text:
                    // console.log(`SELECTED: ${this.sceneResumeText.text}`)                    
                    console.log('Control Volume Settings')
                    // this.scene.start('game')
                    break
                case this.txt_toMainMenu.text:
                    // console.log(`SELECTED: ${this.sceneRestartText.text}`)
                    console.log(`Go to Main Menu SCENE`)
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