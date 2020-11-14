import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

export default class AI_MOVE_LEFT
{
    /** @param {Hopper} hopper*/

    constructor (hopper)
    {
        this.hopper = hopper
    }

    enter ()
    {
        // console.log(`AI: ENTER STATE >> hopper > IDLE`)
        this.hopper.curr_walkSpeed = -this.hopper.curr_walkSpeed * this.hopper.lungeFactor
    }
    
    update ()
    {
        // console.log(`AI STATE: hopper > MOVE LEFT`) 
        
        this.hopper.setVelocityX(this.hopper.curr_walkSpeed)
        // if (this.hopper.body.blocked.left)
        // {
        //     this.hopper.controlState.setState('move_right')
        // }

        if (this.hopper.body.blocked.down)
        {
            this.hopper.controlState.setState('jump')      
        }

        if (!this.hopper.body.blocked.down)
        {
            // this.hopper.scene.spawnHitVFX(this.hopper.body.x + this.hopper.body.width, this.hopper.body.y, 'fx-player-land')
            this.hopper.controlState.setState('fall')
        }

    }

}