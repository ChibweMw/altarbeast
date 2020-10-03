export default class UI_Cursor_Move_CONFIRM
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
        let key_uiCursor_CONFIRM = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        let possible_MenuItems = [this.scene.menuItems]

        if (Phaser.Input.Keyboard.JustDown(key_uiCursor_CONFIRM))
        {
            Phaser.Utils.Array.RotateRight(possible_MenuItems)
        }
    }

}