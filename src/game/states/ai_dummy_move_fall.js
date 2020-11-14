import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class AI_IDLE_MOVE_FALL
{
    /** @param {Dummy} dummy*/

    constructor (dummy)
    {
        this.dummy = dummy
    }

    enter ()
    {
    }
    
    update ()
    {
        // console.log(`AI UPDATE: DUMMY > IDLE`)
        if (this.dummy.body.blocked.down)
        {
            // this.dummy.scene.spawnHitVFX(this.dummy.body.x, this.dummy.body.y + 16, 'fx-player-land')
            this.dummy.controlState.setState('idle')
        }  
        
    }

}