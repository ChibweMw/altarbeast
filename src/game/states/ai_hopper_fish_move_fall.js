import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

export default class AI_IDLE_MOVE_FALL
{
    /** @param {Hopper} hopper*/

    constructor (hopper)
    {
        this.hopper = hopper
    }

    enter ()
    {
        this.hopper.setGravityY(GameOptions.playerGravity / 1.25)

    }

    toJump()
    {
        this.hopper.controlState.setState('jump')
    }
    
    update ()
    {
        // console.log(`AI UPDATE: DUMMY > FALL`)
        
        if (this.hopper.body.blocked.down)
        {
            // this.hopper.body.velocity.x > 0 ? this.hopper.controlState.setState('move_right') : this.hopper.controlState.setState('move_left')
            // this.hopper.curr_walkSpeed < 0 ? this.hopper.controlState.setState('move_left') : this.hopper.controlState.setState('move_right')
            // this.hopper.controlState.setState('jump')
            
            // this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y, 'fx-player-land')
            
            // this.hopper.scene.time.delayedCall(100, this.toJump,null, this)
            this.hopper.controlState.setState('idle')
            // this.hopper.controlState.setState('idle')
        }  
        
    }

}