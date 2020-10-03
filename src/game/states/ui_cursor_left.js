export default class UI_Cursor_Move_LEFT
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
        let key_uiCursor_LEFT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        let possible_MenuItems = [this.scene.menuItems]

        if (Phaser.Input.Keyboard.JustDown(key_uiCursor_LEFT))
        {
            Phaser.Utils.Array.RotateRight(possible_MenuItems)
        }
    }

}