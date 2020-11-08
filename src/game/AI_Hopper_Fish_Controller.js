import GameOptions from '../game/GameOptions.js'

import AI_IDLE from './states/ai_hopper_fish_idle.js'
import AI_MOVE_LEFT from './states/ai_hopper_fish_move_left.js'
import AI_MOVE_RIGHT from './states/ai_hopper_fish_move_right.js'
import AI_MOVE_FALL from './states/ai_hopper_fish_move_fall.js'
import AI_TAKE_DAMAGE from './states/ai_hopper_fish_take_damage.js'
import AI_DEATH_SEQUENCE from './states/ai_hopper_fish_death_sequence.js'
import AI_IDLE_MOVE_JUMP from './states/ai_hopper_fish_move_jump.js'

import Hopper from './Hopper_Fish.js'

export default class Ai_Hopper_Fish_Controller
{
    /** @type {{ [key: string]: { enter: () => void; update?: () => void } }} */
	states
	/** @type {{ enter: () => void; update?: () => void }} */
	currentState
	/**@type {Hopper}*/
	hopper

	/**
	 * @param {Hopper} hopper 
	 */
	constructor(hopper)
	{
		this.states = {
            idle: new AI_IDLE(hopper),
            move_left: new AI_MOVE_LEFT(hopper),
            move_right: new AI_MOVE_RIGHT(hopper),
            fall: new AI_MOVE_FALL(hopper),
            jump: new AI_IDLE_MOVE_JUMP(hopper),
            take_damage: new AI_TAKE_DAMAGE(hopper),
            death_sequence: new AI_DEATH_SEQUENCE(hopper),
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
        console.log(`Hopper STATE : ${name}`)
        this.currentState = this.states[name]
        this.currentState.enter()
    }
    
    update ()
    {
        this.currentState.update()
    }
}