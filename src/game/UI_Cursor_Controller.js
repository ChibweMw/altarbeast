import Cursor_CONFIRM from './states/ui_cursor_confirm.js'
import Cursor_CANCEL from './states/ui_cursor_cancel.js'

import Cursor_UP from './states/ui_cursor_up.js'
import Cursor_DOWN from './states/ui_cursor_down.js'
import Cursor_LEFT from './states/ui_cursor_left.js'
import Cursor_RIGHT from './states/ui_cursor_right.js'
import Cursor_IDLE from './states/ui_cursor_idle.js'

import UI_Cursor from './UI_Cursor.js'
export default class UI_Cursor_Controller
{
    /** @type {{ [key: string]: { enter: () => void } }} */
	states
	/** @type {{ enter: () => void }} */
	currentState
	/**@type {Phaser.GameObjects.Sprite}*/
	cursor

	/**
	 * @param {UI_Cursor} cursor 
	 * @param {Array} menu_Items
	 */
	constructor(cursor, menu_Items)
	{
		this.states = {
			// TODO: add states
			idle: new Cursor_IDLE(cursor, menu_Items),
			up: new Cursor_UP(cursor, menu_Items),
			down: new Cursor_DOWN(cursor, menu_Items),
			left: new Cursor_LEFT(cursor),
			right: new Cursor_RIGHT(cursor),
		}
	}

	/**
	 * 
	 * @param {string} name 
	 */
	setState(name)
	{
        if (this.currentState === this.states[name])
        {
            return
        }
    
        this.currentState = this.states[name]
        this.currentState.enter()
	}
}