import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

export default class AI_IDLE
{
    /** @param {Hopper} hopper*/

    constructor (hopper)
    {
        this.hopper = hopper
    }

    enter ()
    {
        // console.log(`AI: ENTER STATE >> DUMMY > IDLE`)
        this.hopper.clearTint()

        // this.hopper.setVelocityY(-450)   
        // Phaser.Math.RND.pick([this.hopper.controlState.setState('move_right'), this.hopper.controlState.setState('move_left')])   

          
    }
    
    update ()
    {
        if (this.hopper.body.blocked.down)
        {
            console.log(`AI UPDATE: DUMMY > IDLE`)
            Phaser.Math.RND.pick([this.hopper.controlState.setState('move_right'), this.hopper.controlState.setState('move_left')])   
        }
        
    }

}