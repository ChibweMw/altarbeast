import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class AI_DEATH_SEQUENCE
{
    /** @param {Dummy} dummy*/

    constructor (dummy)
    {
        this.dummy = dummy
        this.anim_DeathPlayed = false
    }


    enter ()
    {
        // console.log(`AI: ENTER STATE >> DUMMY > DEATH SEQ`)       
        this.dummyTakeDamage()
    }
    
    update ()
    {
        if (this.dummy.isHurt && this.dummy.body.blocked.down)
        {
            if (!this.anim_DeathPlayed)
            {
                this.anim_DeathPlayed = true
                this.dummy.scene.spawnItem(this.dummy.body.x, this.dummy.body.y, 'ui-health')
                this.dummy.play('anim-fx-hit-enemy-death')
                this.dummy.setVelocityX(0)
            }
            if (this.dummy.anims.isPlaying && this.dummy.anims.currentAnim.key === 'anim-fx-hit-enemy-death')
            {
                // console.log(`DEATH ANIM ISPLAYING`) 
                return
            }
            else
            {
                // console.log(`DEATH ANIM FINISHED`) 
                this.dummy.scene.GROUP_training_dummy.killAndHide(this.dummy)
                this.dummy.scene.GROUP_training_dummy.remove(this.dummy) 
            }
        }
    }

    dummyTakeDamage (player)
    {
        if (this.dummy.isHurt)
        {
            return
        }
        else
        {
            this.dummy.name = 'beenhit'
            // this.dummy.isHurt = true
            // console.log('DUMMY BEEN HIT BY PLAYER')

            // TAKE DAMAGE
            this.dummy.currHP -= 1
            // KNOCKBACK SETUP
            this.dummy.setGravityY(GameOptions.playerGravity / 2)
            let recoil = 100
            let xMult = 1
            let yMult = 2
            let xVel = 0
            this.dummy.scene.player.body.x < this.dummy.body.x ? xVel = recoil * xMult : xVel = -recoil * xMult
            let yVel = -recoil * yMult
            this.dummy.setVelocity(xVel, yVel)

            // SPRITE FLASH EFFECT
            this.dummy.setTintFill(0xffffff);
            this.dummy.scene.tweens.add({
                targets: this.dummy,
                // alpha: 0,
                alpha: { from: 1, to: 0.5 },
                // tint: 0xffffff,
                duration: 50,
                ease: 'Cubic.easeInOut',
                yoyo: true,
                repeat: 5,
            })
            // CAMERA SHAKE
            this.dummy.scene.cameras.main.shake(100, 0.0025)
            // this.dummy.isHurt = false
        }
    }

}