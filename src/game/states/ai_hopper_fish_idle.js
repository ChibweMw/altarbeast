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
        // this.hopper.clearTint()
        this.hopper.controlState.setState('move_right')
    }
    
    toJump()
    {
        this.hopper.controlState.setState('jump')
    }
    update ()
    {
        // if (this.hopper.body.blocked.down && this.hopper.currHP > 0)
        // {
        //     this.hopper.scene.time.delayedCall(100, this.toJump, null, this)
        // }
        
    }

}