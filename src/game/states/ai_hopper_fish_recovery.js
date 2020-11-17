import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

export default class AI_HOPPER_RECOVERY
{
    /** @param {Hopper} hopper*/

    constructor (hopper)
    {
        this.hopper = hopper
    }

    enter ()
    {
        this.hopper.isHurt = false
        this.hopper.setGravityY(GameOptions.playerGravity)
        this.hopper.setDamping(false)
        this.hopper.setDrag(1)
        this.hopper.setAlpha(1)
        this.hopper.clearTint()
        if (this.hopper.currHP <= 0)
        {
            console.log('+++++++++++++================================DEATH SEQ+++++++++++++================================')
            this.hopper.controlState.setState('death_sequence')            
        } else
        {
            console.log('+++++++++++++================================RECOVERRYYYY')
            this.hopper.controlState.setState('idle')
        }
    }
    
    update ()
    {

    }

}