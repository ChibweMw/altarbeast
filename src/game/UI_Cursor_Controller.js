import UI_Cursor from './UI_Cursor.js'

export default class UI_Cursor_Controller
{
    /** @type {{ [key: string]: { enter: () => void } }} */
	states

	/** @type {{ enter: () => void }} */
	currentState

	/**
	 * @param {Phaser.Physics.Arcade.Sprite} cursor 
	 */
	constructor(cursor)
	{
		this.states = {
                // TODO: add states
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