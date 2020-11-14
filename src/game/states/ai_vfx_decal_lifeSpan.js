import GameOptions from "../GameOptions.js"
import VFX_COLLISION from '../VFX_Collision.js'

export default class AI_VFX_DECAL_LIFESPAN
{
    /** @param {VFX_COLLISION} vfx_collision*/

    constructor (vfx_collision)
    {
        this.vfx_collision = vfx_collision
    }

    enter ()
    {
        // console.log(`DECAL ANIM PLAYED >> ${this.animPlayed}`)
        this.removeDecal()
    }
    
    removeDecal()
    {
        this.vfx_collision.data.values.props.group.killAndHide(this.vfx_collision)
        this.vfx_collision.data.values.props.group.remove(this.vfx_collision) 
    }

}