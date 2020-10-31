import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class AI_MOVE_LEFT
{
    /** @param {Dummy} dummy*/

    constructor (dummy)
    {
        this.dummy = dummy
    }

    enter ()
    {
        // console.log(`AI: ENTER STATE >> DUMMY > IDLE`)
        this.dummy.curr_walkSpeed = -this.dummy.curr_walkSpeed        
    }
    
    update ()
    {
        // console.log(`AI STATE: DUMMY > IDLE`) 
        this.dummy.setVelocityX(this.dummy.curr_walkSpeed)
        if (this.dummy.body.blocked.left)
        {
            this.dummy.controlState.setState('move_right')
        }

    }

}