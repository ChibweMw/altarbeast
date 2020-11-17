import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

export default class AI_IDLE_MOVE_FALL
{
    /** @param {Hopper} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        this.prefab.setGravityY(GameOptions.playerGravity / 1.25)

    }

    toJump()
    {
        this.prefab.controlState.setState('jump')
    }
    
    update ()
    {
        // console.log(`AI UPDATE: DUMMY > FALL`)
        
        // if (this.prefab.body.blocked.down && this.prefab.data.values.props.currHP > 0)
        if (this.prefab.body.blocked.down)
        {
            // this.prefab.body.velocity.x > 0 ? this.prefab.controlState.setState('move_right') : this.prefab.controlState.setState('move_left')
            // this.prefab.curr_walkSpeed < 0 ? this.prefab.controlState.setState('move_left') : this.prefab.controlState.setState('move_right')
            // console.log(`>>>>>> FALL SAFE <<<<<<<<<<`)
            // this.prefab.controlState.setState('jump')
            
            // this.prefab.scene.spawnHitVFX(this.prefab.body.x, this.prefab.body.y, 'fx-player-land')
            
            // this.prefab.scene.time.delayedCall(100, this.toJump,null, this)
            // if (this.prefab.currHP <= 0)
            // {
            //     debugger
            //     this.prefab.controlState.setState('death_sequence')
            // } else
            // {
            //     this.prefab.controlState.setState('idle')
            // }

            this.prefab.controlState.setState('idle')

        } // else if (this.prefab.body.blocked.down && this.prefab.data.values.props.currHP <= 0)
        
        // } else if (this.prefab.body.blocked.down && this.prefab.currHP <= 0)
        // {
        //     console.log(`>>>>>>>>> FALL DEATH <<<<<<<<<<`)
        //     this.prefab.controlState.setState('death_sequence')
        // }
    }

}