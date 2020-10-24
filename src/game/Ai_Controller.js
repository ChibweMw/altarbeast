import GameOptions from '../game/GameOptions.js'

import AI_IDLE from './states/ai_dummy_idle.js'

import Enemy from './Dummy.js'

export default class Ai_Controller
{
    /** @type {{ [key: string]: { enter: () => void; update?: () => void } }} */
	states
	/** @type {{ enter: () => void; update?: () => void }} */
	currentState
	/**@type {Enemy}*/
	enemy

	/**
	 * @param {Enemy} enemy 
	 */
	constructor(enemy)
	{
		this.states = {
            idle: new AI_IDLE(enemy) 
		}
	}

	/**
	 * 
	 * @param {string} name 
	 */
	setState(name)
	{
        // if (this.currentState === this.states[name] && name !== 'jump')
        if (this.currentState === this.states[name])
        {
            return
        }
        // console.log(`CURRENT STATE '${name}'`)

        GameOptions.STATE_PLAYER_PREV = name

        this.currentState = this.states[name]
        this.currentState.enter()
    }
    
    update ()
    {
        this.currentState.update()
    }
}