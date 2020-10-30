import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class AI_IDLE
{
    /** @param {Dummy} dummy*/

    constructor (dummy)
    {
        this.dummy = dummy
    }

    enter ()
    {
        console.log(`AI: ENTER STATE >> DUMMY > IDLE`)
        this.dummy.clearTint()
        if (this.dummy.scene.player.body.position.x > this.dummy.body.position.x)
        {
            this.dummy.controlState.setState('move_right')
        } else 
        {
            this.dummy.controlState.setState('move_left')
        }    
    }
    
    update ()
    {
        // console.log(`AI UPDATE: DUMMY > IDLE`)
        
    }

}