export default class UI_Cursor_Move_RIGHT
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
        let key_uiCursor_RIGHT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        let possible_MenuItems = [this.scene.menuItems]

        if (Phaser.Input.Keyboard.JustDown(key_uiCursor_RIGHT))
        {
            Phaser.Utils.Array.RotateRight(possible_MenuItems)
        }
    }

}