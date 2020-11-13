import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

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
        this.dummyTakeDamage()
    }
    
    update ()
    {
        if (this.hopper.isHurt && this.hopper.body.blocked.down)
        {
            if (!this.anim_DeathPlayed)
            {
                this.anim_DeathPlayed = true
                this.hopper.scene.spawnItem(this.hopper.body.x, this.hopper.body.y, 'ui-health')
                this.hopper.play('anim-fx-hit-enemy-death')
                this.hopper.setVelocityX(0)
            }
            if (this.hopper.anims.isPlaying && this.hopper.anims.currentAnim.key === 'anim-fx-hit-enemy-death')
            {
                // console.log(`DEATH ANIM ISPLAYING`) 
                return
            }
            else
            {
                // console.log(`DEATH ANIM FINISHED`) 
                // this.hopper.scene.GROUP_hopFish.killAndHide(this.hopper)
                // this.hopper.scene.GROUP_hopFish.remove(this.hopper) 
                this.hopper.data.values.props.group.killAndHide(this.hopper)
                this.hopper.data.values.props.group.remove(this.hopper) 
            }
        }
    }

    dummyTakeDamage (player)
    {
        if (this.hopper.isHurt)
        {
            return
        }
        else
        {
            this.hopper.name = 'beenhit'
            // this.hopper.isHurt = true
            // console.log('DUMMY BEEN HIT BY PLAYER')

            // TAKE DAMAGE
            this.hopper.currHP -= 1
            // KNOCKBACK SETUP
            this.hopper.setGravityY(GameOptions.playerGravity / 2)
            let recoil = 100
            let xMult = 1
            let yMult = 2
            let xVel = 0
            this.hopper.scene.player.body.x < this.hopper.body.x ? xVel = recoil * xMult : xVel = -recoil * xMult
            let yVel = -recoil * yMult
            this.hopper.setVelocity(xVel, yVel)

            // SPRITE FLASH EFFECT
            this.hopper.setTintFill(0xffffff);
            this.hopper.scene.tweens.add({
                targets: this.hopper,
                // alpha: 0,
                alpha: { from: 1, to: 0.5 },
                // tint: 0xffffff,
                duration: 50,
                ease: 'Cubic.easeInOut',
                yoyo: true,
                repeat: 5,
            })
            // CAMERA SHAKE
            this.hopper.scene.cameras.main.shake(100, 0.0025)
            // this.hopper.isHurt = false
        }
    }

}