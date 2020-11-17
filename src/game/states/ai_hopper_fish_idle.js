import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

export default class AI_IDLE
{
    /** @param {Hopper} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab
        this.enteringWalkSpeed = null
    }

    enter ()
    {
        // this.prefab.clearTint()
        // this.prefab.isHurt = false
        this.prefab.hitBox.body.checkCollision.none = false
        this.prefab.curr_walkSpeed = 0
        this.prefab.setVelocityX(this.prefab.curr_walkSpeed)
        // if (!this.prefab.isHurt)
        // {
        //     // debugger
        //     /**
        //      * this seems to be an issue when dealing with damage. 
        //      * delayed call results in state transition confusion
        //      */
        // }
        /**@type {Phaser.Time.TimerEvent} */
        this.prefab.idle_transition_Timer = this.prefab.scene.time.delayedCall(500, this.toNextScene, [this.prefab, 'move_right'])
        // this.prefab.controlState.setState('move_right')
    }
    
    toNextScene(prefab, state)
    {
        prefab.controlState.setState(state)
    }
    update ()
    {
        // if (this.prefab.body.blocked.down && this.prefab.currHP > 0)
        // {
        //     this.prefab.scene.time.delayedCall(100, this.toJump, null, this)
        // }
        
    }

}