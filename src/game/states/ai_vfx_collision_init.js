import GameOptions from "../GameOptions.js"
import VFX_COLLISION from '../VFX_Collision.js'

export default class AI_VFX_COLLISION_INIT
{
    /** @param {VFX_COLLISION} vfx_collision*/

    constructor (vfx_collision)
    {
        this.vfx_collision = vfx_collision
        this.animPlayed = false
    }

    enter ()
    {
        // this.vfx_collision.setTexture('vfx_collision')
        // console.log(`AI: HOPPER DATA GROUP > ${this.vfx_collision.data.values.props.group}`)
        // this.vfx_collision.play(`anim-${this.vfx_collision.data.values.props.key}`)
        // this.vfx_collision.setDepth(-3)
        // console.log(`AI: vfx_collision > REMOVE REMOVE REMOVE`)
        this.animPlayed = false
        this.vfx_collision.play(`anim-${this.vfx_collision.data.values.props.key}`)
    }
    
    update ()
    {
        if (!this.vfx_collision.anims.isPlaying && !this.animPlayed)
        {
            // console.log(`>>>>>>>>>>>>>>>>>>>>>> ${Object.entries(this.vfx_collision.data.values.props.group)}`)
            // this.vfx_collision.scene.GROUP_VFX_HIT.killAndHide(this)
            // this.vfx_collision.scene.GROUP_VFX_HIT.remove(this) 
            this.vfx_collision.controlState.setState('recycle')
            this.animPlayed = true
        }
    }

}