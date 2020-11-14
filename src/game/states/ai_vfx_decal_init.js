import GameOptions from "../GameOptions.js"
import VFX_COLLISION from '../VFX_Collision.js'

export default class AI_VFX_DECAL_INIT
{
    /** @param {VFX_COLLISION} vfx_collision*/

    constructor (vfx_collision)
    {
        this.vfx_collision = vfx_collision
        this.animPlayed = false
        this.maskCreated = false
    }

    enter ()
    {
        console.log(`DECAL INIT STATE ENTERED >>`)
        // this.vfx_collision.setTexture('vfx_collision')
        // console.log(`AI: HOPPER DATA GROUP > ${this.vfx_collision.data.values.props.group}`)
        // this.vfx_collision.play(`anim-${this.vfx_collision.data.values.props.key}`)
        this.animPlayed = false
        this.vfx_collision.setDepth(-3)
        this.vfx_collision.play(`anim-${this.vfx_collision.data.values.props.key}`)
        if (!this.maskCreated)
        {
            this.vfx_collision.mask = new Phaser.Display.Masks.BitmapMask(this.vfx_collision.scene, this.vfx_collision.scene.layerStaticPlatform)
            this.vfx_collision.mask = new Phaser.Display.Masks.BitmapMask(this.vfx_collision.scene, this.vfx_collision.scene.layerPlatformDeco)
            this.maskCreated = true
        }

        // console.log(`DECAL ANIM PLAYED >> ${this.animPlayed}`)

    }
    
    update ()
    {
        if (!this.vfx_collision.anims.isPlaying && !this.animPlayed)
        {
            // this.vfx_collision.setTexture(this.vfx_collision.data.values.props.key, 7)
            this.vfx_collision.scene.time.delayedCall(100, this.removeDecal, null, this)
            this.animPlayed = true
        }
    }
    
    removeDecal()
    {
        this.vfx_collision.controlState.setState('recycle')
    }

}