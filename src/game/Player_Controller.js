import Player_IDLE from './states/player_idle.js'
import Player_Move_JUMP from './states/player_move_jump.js'
import Player_Move_DOWN from './states/player_move_down.js'
import Player_Move_LEFT from './states/player_move_left.js'
import Player_Move_RIGHT from './states/player_move_right.js'

import Player from './Player.js'
export default class Player_Controller
{
    /** @type {{ [key: string]: { enter: () => void } }} */
	states
	/** @type {{ enter: () => void }} */
	currentState
	/**@type {Player}*/
	player

	/**
	 * @param {Player} player 
	 */
	constructor(player)
	{
		this.states = {
			// TODO: add states
			idle: new Player_IDLE(player),
			jump: new Player_Move_JUMP(player),
			down: new Player_Move_DOWN(player),
			left: new Player_Move_LEFT(player),
			right: new Player_Move_RIGHT(player),
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
        // console.log(`CURRENT STATE '${name}'`)
        this.currentState = this.states[name]
        this.currentState.enter()
	}
}