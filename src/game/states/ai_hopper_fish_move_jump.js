import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'
import cnf_vfx_jump_group from "../prefab_configs/cnf_vfx_jump_group.js"

export default class AI_IDLE_MOVE_JUMP
{
    /** @param {Hopper} hopper*/

    constructor (hopper)
    {
        this.hopper = hopper
    }

    enter ()
    {
        // debugger
        this.hopper.setGravityY(GameOptions.playerGravity / 6)

        this.hopper.setVelocityY(this.hopper.jumpForce)      
        // this.hopper.setVelocityX(this.hopper.body.velocity.x * this.hopper.lungeFactor)      
    }
    
    update ()
    {
        // console.log(`AI UPDATE: DUMMY > JUMP`)

        if (this.hopper.body.velocity.y > 10)
        {
            this.hopper.controlState.setState('fall')
        }
        if (this.hopper.body.blocked.down && this.hopper.currHP > 0)
        {
            this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y + 16, cnf_vfx_jump_group)
            this.hopper.controlState.setState('idle')
            // this.hopper.controlState.setState('jump')
        }  
        
    }

}