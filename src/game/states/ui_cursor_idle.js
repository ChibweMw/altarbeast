import GameOptions from "../GameOptions.js"

export default class UI_Cursor_Move_IDLE
{
    /** @param {Phaser.GameObjects.Sprite} cursor*/
    
    /** @param {Array} menu_Items*/
    

    constructor (cursor, menu_Items)
    {
        this.menu_Items = menu_Items
        this.cursor = cursor
    }

    enter ()
    {
        let cursor_posY = this.menu_Items[0].y
        let ui_text = this.menu_Items[0].text

        this.cursor.y = cursor_posY
        GameOptions.UI_cursorTarget = ui_text
        console.log(`>> CURSOR STATE: IDLE, target: ${ui_text}` )

    }

}