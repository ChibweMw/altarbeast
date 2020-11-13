import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

export default class AI_TAKE_DAMAGE
{
    /** @param {Hopper} hopper*/

    constructor (hopper)
    {
        this.hopper = hopper
        /**@type {Phaser.Tweens.Tween} */
        this.tween_sprite_flash = undefined
        this.particleTimerEvent = null
    }

    enter ()
    {
        // console.log(`AI: ENTER STATE >> DUMMY > TAKE DAMAGE`)
        this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y, 'fx-hit-connect')  
        this.spawnParticle()      
        this.dummyTakeDamage()  
        this.particleTimerEvent = this.hopper.scene.time.addEvent({delay: 60, callback: this.spawnParticle, args: null, callbackScope: this, repeat: -1})   
    
    }

    spawnParticle()
    {
        // PLAY WITH RANDOMIZATION OF VFX PLACEMENT
        // FEELS STIFF AND UNIFORM
        // this.hopper.body.velocity.x > 0 ? this.hopper.scene.spawnHitVFX(this.hopper.body.x + 18, this.hopper.body.y, 'fx-hit-connect') : this.hopper.scene.spawnHitVFX(this.hopper.body.x - 10, this.hopper.body.y, 'fx-hit-connect')
        // this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y + 4, 'fx-hit-block')        
        // this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y - 4, 'fx-hit-block')   
        if (this.hopper.body.velocity.x > 0) 
        {
            this.hopper.scene.spawnHitVFX(this.hopper.body.x + Phaser.Math.RND.integerInRange(16, 18), this.hopper.body.y, 'fx-hit-connect')
            this.hopper.scene.spawnHitVFX(this.hopper.body.x + Phaser.Math.RND.integerInRange(10, 18), this.hopper.body.y - Phaser.Math.RND.integerInRange(0, 8), 'fx-hit-block')        
            this.hopper.scene.spawnHitVFX(this.hopper.body.x + Phaser.Math.RND.integerInRange(10, 18), this.hopper.body.y + Phaser.Math.RND.integerInRange(0, 8), 'fx-hit-block')        
        } else
        {
            this.hopper.scene.spawnHitVFX(this.hopper.body.x - Phaser.Math.RND.integerInRange(8, 10), this.hopper.body.y, 'fx-hit-connect')
            this.hopper.scene.spawnHitVFX(this.hopper.body.x - Phaser.Math.RND.integerInRange(0, 8), this.hopper.body.y - Phaser.Math.RND.integerInRange(0, 8), 'fx-hit-block')        
            this.hopper.scene.spawnHitVFX(this.hopper.body.x - Phaser.Math.RND.integerInRange(0, 8), this.hopper.body.y + Phaser.Math.RND.integerInRange(0, 8), 'fx-hit-block')        
        }     
    }
    
    update()
    {
        // if (this.name && this.body.blocked.down)
        if (this.hopper.isHurt && this.hopper.body.blocked.down && this.hopper.currHP > 0)
        {
            this.recoverFromHit()
        } else if (this.hopper.isHurt && this.hopper.body.blocked.down && this.hopper.currHP <= 0)
        {
            // console.log('DUMMY DIE NOW')
            this.particleTimerEvent.destroy()
            this.hopper.clearTint()
            this.hopper.controlState.setState('death_sequence')
        }

        if (this.hopper.body.velocity.y < 0 && !this.hopper.body.blocked.down)
        {
            this.hopper.setGravityY(GameOptions.playerGravity * 2)
            this.hopper.setDrag(0.875)
        }
    }
    
    dummyTakeDamage (player, hopper)
    {
        if (this.hopper.isHurt)
        {
            return
        }
        else
        {
            this.hopper.isHurt = true
            // console.log('DUMMY BEEN HIT BY PLAYER')

            // TAKE DAMAGE
            this.hopper.currHP -= 1
            // KNOCKBACK SETUP
            this.hopper.setGravityY(GameOptions.playerGravity / 2)
            let recoil = 400
            let xMult = 1.8
            let yMult = 1.6
            let xVel = 0
            this.hopper.scene.player.body.x < this.hopper.body.x ? xVel = recoil * xMult : xVel = -recoil * xMult
            let yVel = -recoil * yMult
            this.hopper.setVelocity(xVel, yVel)

            this.hopper.setDamping(true)
            this.hopper.setDrag(0.8)


            // SPRITE FLASH EFFECT
            // this.hopper.setTintFill(0xffffff);
            // this.hopper.scene.tweens.add({
            //     targets: this.hopper,
            //     // alpha: 0,
            //     alpha: { from: 1, to: 0.5 },
            //     // tint: 0xffffff,
            //     duration: 50,
            //     ease: 'Cubic.easeInOut',
            //     yoyo: true,
            //     repeat: 5,
            // })
            this.spriteFlash()
            // CAMERA SHAKE
            this.hopper.scene.cameras.main.shake(100, 0.0025)
        }
    }
    
    recoverFromHit ()
    {
        this.hopper.isHurt = false
        this.hopper.setGravityY(GameOptions.playerGravity)
        this.hopper.setDamping(false)
        this.hopper.setDrag(1)
        this.particleTimerEvent.destroy()
        this.tween_sprite_flash.stop()
        this.hopper.setAlpha(1)
        // this.hopper.clearTint()
        this.hopper.controlState.setState('idle')
    }

    spriteFlash()
    {
        // SPRITE FLASH EFFECT
        this.hopper.setTintFill(0xffffff);
        this.tween_sprite_flash = this.hopper.scene.tweens.add({
            targets: this.hopper,
            // alpha: 0,
            alpha: { from: 1, to: 0.5 },
            // tint: 0xffffff,
            duration: 50,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            repeat: 5,
        })
    }
}