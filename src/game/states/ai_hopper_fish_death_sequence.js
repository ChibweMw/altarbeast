import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'
import cnf_vfx_decal_group from "../prefab_configs/cnf_vfx_decal_group.js"

export default class AI_DEATH_SEQUENCE
{
    /** @param {Hopper} hopper*/

    constructor (hopper)
    {
        this.hopper = hopper
        this.anim_DeathPlayed = false
    }


    enter ()
    {
        // console.log(`AI: ENTER STATE >> DUMMY > DEATH SEQ`)   
        this.anim_DeathPlayed = false    
        this.hopper.isDeathSeq = true
        this.hopper.scene.cameras.main.shake(100, 0.0045)
        // this.dummyTakeDamage() // to remove 
    }
    
    update ()
    {
        // if (this.hopper.isHurt && this.hopper.body.blocked.down || this.hopper.currHP <= 0 && this.hopper.body.blocked.down)
        // if (this.hopper.currHP <= 0 && this.hopper.body.blocked.down)
        // {
            if (!this.anim_DeathPlayed)
            {
                this.hopper.scene.spawnItem(this.hopper.body.x, this.hopper.body.y, 'ui-health')
                this.hopper.play('anim-fx-hit-enemy-death')
                this.hopper.setVelocity(0)
                // this.hopper.scene.spawnHitVFX(this.hopper.body.x + 16, this.hopper.body.y - 16, 'fx-hit-enemy-death')  
                // this.hopper.scene.spawnHitVFX(this.hopper.body.x - 16, this.hopper.body.y, 'fx-hit-enemy-death')  
                this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y, cnf_vfx_decal_group)  
                this.anim_DeathPlayed = true
            }
            else
            {
                if (this.hopper.anims.isPlaying && this.hopper.anims.currentAnim.key === 'anim-fx-hit-enemy-death')
                {
                    if (this.hopper.anims.currentFrame === this.hopper.anims.currentAnim.getLastFrame())
                    {

                        // console.log(`DEATH ANIM FINISHED`) 
                        // this.hopper.scene.GROUP_hopFish.killAndHide(this.hopper)
                        // this.hopper.scene.GROUP_hopFish.remove(this.hopper) 
                        this.hopper.anims.stop()

                        this.hopper.hitBox.setActive(false)
                        this.hopper.setActive(false)

                        this.hopper.data.values.props.group.killAndHide(this.hopper)
                        this.hopper.data.values.props.group.remove(this.hopper) 
                        // this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y + 16, 'fx-hopper-jump')
                        // this.hopper.scene.spawnHitVFX(this.hopper.body.x - 16, this.hopper.body.y + 16, 'fx-hopper-land')
                        // this.hopper.scene.spawnHitVFX(this.hopper.body.x + 16, this.hopper.body.y + 16, 'fx-hopper-land')
                    }
                    
                    // console.log(`>>>>> DEATH ANIM ISPLAYING`) 
                    // return
                }
                // else //if (!this.hopper.anims.isPlaying && this.hopper.anims.currentAnim.key === 'anim-fx-hit-enemy-death')
                // {
                // }
            }
            
        // }
    }
}