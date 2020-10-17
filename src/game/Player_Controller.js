import Player_UNHURT from './states/player_unhurt.js'

import Player_IDLE from './states/player_idle.js'
import Player_Move_JUMP from './states/player_move_jump.js'
import Player_Move_DOWN from './states/player_move_down.js'
import Player_Move_LEFT from './states/player_move_left.js'
import Player_Move_RIGHT from './states/player_move_right.js'
import Player_Take_DAMAGE from './states/player_take_damage.js'
import Player_Gain_Health from './states/player_gain_health.js'
import Player_ATTACK_STANDING from './states/player_attack_standing.js'
import Player_Crouch from './states/player_crouch.js'
import Player_ATTACK_JUMPING from './states/player_attack_jumping.js'
import Player_ATTACK_CROUCHING from './states/player_attack_crouch.js'

import Player from './Player.js'

export default class Player_Controller
{
    /** @type {{ [key: string]: { enter: () => void; update?: () => void } }} */
	states
	/** @type {{ enter: () => void; update?: () => void }} */
	currentState
	/**@type {Player}*/
	player

	/**
	 * @param {Player} player 
	 */
	constructor(player)
	{
		this.states = {
            STATE_UNHURT: new Player_UNHURT(player),
            idle: new Player_IDLE(player),
            crouch: new Player_Crouch(player),
			jump: new Player_Move_JUMP(player),
			down: new Player_Move_DOWN(player),
			left: new Player_Move_LEFT(player),
            right: new Player_Move_RIGHT(player),
            take_damage: new Player_Take_DAMAGE(player),
            gain_health: new Player_Gain_Health(player),
            stand_atk_norm: new Player_ATTACK_STANDING(player),
            jump_atk_norm: new Player_ATTACK_JUMPING(player),
            crouch_atk_norm: new Player_ATTACK_CROUCHING(player)
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
            // this.currentState.update()
            return
        }
        // console.log(`CURRENT STATE '${name}'`)
        this.currentState = this.states[name]
        this.currentState.enter()
    }
    
    update ()
    {
        this.currentState.update()
        // console.log(`UPDATE >> Player Controller `)
    }
}