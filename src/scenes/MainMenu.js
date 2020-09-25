export default class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super('menu-main')
    }
    
    menuText_Start
    menuSprite_Cursor

    create()
    {
        console.log(`Main Menu Entered`)
        this.add.image(this.game.scale.width / 2, this.game.scale.height / 2, 'logo')
        
        this.menuText_Start = this.add.bitmapText(this.game.scale.width / 2, this.game.scale.height * 0.8, 'tentown', 'Start Game', 12).setOrigin(0.5, 0)
        this.menuSprite_Cursor = this.add.sprite(this.menuText_Start.x - 70, this.menuText_Start.y - 4, 'ui-cursor', 0).setOrigin(0)

        let key_START = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        key_START.once('down', () => {
            this.scene.start('game')
        })

    }
}