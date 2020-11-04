import GameOptions from '../game/GameOptions.js'

import AI_IDLE from './states/ai_dummy_idle.js'
import AI_MOVE_LEFT from './states/ai_dummy_move_left.js'
import AI_MOVE_RIGHT from './states/ai_dummy_move_right.js'
import AI_MOVE_FALL from './states/ai_dummy_move_fall.js'
import AI_TAKE_DAMAGE from './states/ai_dummy_take_damage.js'
import AI_DEATH_SEQUENCE from './states/ai_dummy_death_sequence.js'

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
            move_left: new AI_MOVE_LEFT(enemy),
            move_right: new AI_MOVE_RIGHT(enemy),
            fall: new AI_MOVE_FALL(enemy),
            take_damage: new AI_TAKE_DAMAGE(enemy),
            death_sequence: new AI_DEATH_SEQUENCE(enemy),
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

        // GameOptions.STATE_PLAYER_PREV = name

        this.currentState = this.states[name]
        this.currentState.enter()
    }
    
    update ()
    {
        this.currentState.update()
    }
}