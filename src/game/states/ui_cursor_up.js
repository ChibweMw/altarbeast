import UI_Cursor from '../UI_Cursor.js'
export default class UI_Cursor_Move_UP 
{
    /**@type {UI_Cursor}*/
    cursor
    /**@type {Array}*/
    menuItems
    
    /** 
     * @param {UI_Cursor} cursor
     * @param {Array} menuItems
    */

    constructor (cursor, menuItems)
    {
        this.cursor = cursor
        this.menuItems = menuItems
    }

    enter ()
    {
        Phaser.Utils.Array.RotateRight(this.menuItems)
        this.cursor.playSound_Nav()
        console.log('CURSOR UP')
    }

}