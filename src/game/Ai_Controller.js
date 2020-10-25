import GameOptions from '../game/GameOptions.js'

import AI_IDLE from './states/ai_dummy_idle.js'
import Player_MOVE_LEFT from './states/ai_dummy_move_left.js'
import Player_MOVE_RIGHT from './states/ai_dummy_move_right.js'
import Player_TAKE_DAMAGE from './states/ai_dummy_take_damage.js'
import Player_DEATH_SEQUENCE from './states/ai_dummy_death_sequence.js'

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
            idle: new AI_IDLE(enemy),
            move_left: new Player_MOVE_LEFT(enemy),
            move_right: new Player_MOVE_RIGHT(enemy),
            move_take_damage: new Player_TAKE_DAMAGE(enemy),
            move_death_sequence: new Player_DEATH_SEQUENCE(enemy),
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