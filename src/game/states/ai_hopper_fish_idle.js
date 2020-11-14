import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

export default class AI_IDLE
{
    /** @param {Hopper} hopper*/

    constructor (hopper)
    {
        this.hopper = hopper
        this.enteringWalkSpeed = null
    }

    enter ()
    {
        // console.log(`AI: ENTER STATE >> DUMMY > IDLE`)
        this.hopper.clearTint()
        // this.hopper.curr_walkSpeed = 0
        // this.hopper.setVelocityY(-450)   
        // Phaser.Math.RND.pick([this.hopper.controlState.setState('move_right'), this.hopper.controlState.setState('move_left')])   

          
    }

    toJump()
    {
        this.hopper.controlState.setState('jump')
    }
    update ()
    {
        if (this.hopper.body.blocked.down)
        {
            this.hopper.scene.time.delayedCall(100, this.toJump, null, this)
        }
        
    }

}