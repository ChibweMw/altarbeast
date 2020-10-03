export default class UI_Cursor_Move_DOWN 
{
    /**@type {Phaser.GameObjects.Sprite}*/
    cursor
    /**@type {Array}*/
    menuItems
    
    /** 
     * @param {Phaser.GameObjects.Sprite} cursor
     * @param {Array} menuItems
    */

    constructor (cursor, menuItems)
    {
        this.cursor = cursor
        this.menuItems = menuItems
    }

    enter ()
    {
        Phaser.Utils.Array.RotateLeft(this.menuItems)
    }

}