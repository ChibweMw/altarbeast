export default class UI_Cursor_Move_UP 
{
    /** @type {Phaser.Scene} */
    scene
    /** @type {Phaser.GameObjects.Sprite} */
    cursor

    constructor (scene, cursor)
    {
        this.scene = scene
        this.cursor = cursor
    }

    enter ()
    {
        let key_uiCursor_UP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        let possible_MenuItems = [this.scene.menuItems]

        if (Phaser.Input.Keyboard.JustDown(key_uiCursor_UP))
        {
            Phaser.Utils.Array.RotateRight(possible_MenuItems)
        }
    }

}