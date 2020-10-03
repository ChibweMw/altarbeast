export default class UI_Cursor_Move_CANCEL
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
        let key_uiCursor_CANCEL = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        let possible_MenuItems = [this.scene.menuItems]

        if (Phaser.Input.Keyboard.JustDown(key_uiCursor_CANCEL))
        {
            Phaser.Utils.Array.RotateRight(possible_MenuItems)
        }
    }

}