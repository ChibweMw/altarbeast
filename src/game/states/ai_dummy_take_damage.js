import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class AI_TAKE_DAMAGE
{
    /** @param {Dummy} dummy*/

    constructor (dummy)
    {
        this.dummy = dummy
        /**@type {Phaser.Tweens.Tween} */
        this.tween_sprite_flash = undefined
        this.particleTimerEvent = null
    }

    enter ()
    {
        // console.log(`AI: ENTER STATE >> DUMMY > TAKE DAMAGE`)
        // this.dummy.setTintFill(0xffffff)
        this.dummy.scene.spawnHitVFX(this.dummy.body.x, this.dummy.body.y, 'fx-hit-connect')        
        this.spawnParticle()      
        this.dummyTakeDamage()  
        this.particleTimerEvent = this.dummy.scene.time.addEvent({delay: 60, callback: this.spawnParticle, args: null, callbackScope: this, repeat: -1})   
    
    }

    spawnParticle()
    {
        // PLAY WITH RANDOMIZATION OF VFX PLACEMENT
        // FEELS STIFF AND UNIFORM
        if (this.dummy.body.velocity.x > 0) 
        {
            this.dummy.scene.spawnHitVFX(this.dummy.body.x + Phaser.Math.RND.integerInRange(16, 18), this.dummy.body.y, 'fx-hit-connect')
            this.dummy.scene.spawnHitVFX(this.dummy.body.x + Phaser.Math.RND.integerInRange(10, 18), this.dummy.body.y - Phaser.Math.RND.integerInRange(6, 8), 'fx-hit-block')        
            this.dummy.scene.spawnHitVFX(this.dummy.body.x + Phaser.Math.RND.integerInRange(10, 18), this.dummy.body.y + Phaser.Math.RND.integerInRange(6, 8), 'fx-hit-block')        
        } else
        {
            this.dummy.scene.spawnHitVFX(this.dummy.body.x - Phaser.Math.RND.integerInRange(8, 10), this.dummy.body.y, 'fx-hit-connect')
            this.dummy.scene.spawnHitVFX(this.dummy.body.x - Phaser.Math.RND.integerInRange(0, 8), this.dummy.body.y - Phaser.Math.RND.integerInRange(6, 8), 'fx-hit-block')        
            this.dummy.scene.spawnHitVFX(this.dummy.body.x - Phaser.Math.RND.integerInRange(0, 8), this.dummy.body.y + Phaser.Math.RND.integerInRange(6, 8), 'fx-hit-block')        
        }
        // this.dummy.body.velocity.x > 0 ? this.dummy.scene.spawnHitVFX(this.dummy.body.x + 18, this.dummy.body.y, 'fx-hit-block') : this.dummy.scene.spawnHitVFX(this.dummy.body.x - 10, this.dummy.body.y, 'fx-hit-block')
        // this.dummy.scene.spawnHitVFX(this.dummy.body.x, this.dummy.body.y - 8, 'fx-hit-connect')        
        // this.dummy.scene.spawnHitVFX(this.dummy.body.x, this.dummy.body.y + 8, 'fx-hit-connect')        
    }
    
    update()
    {
        // if (this.name && this.body.blocked.down)
        if (this.dummy.isHurt && this.dummy.body.blocked.down && this.dummy.currHP > 0)
        {
            this.recoverFromHit()
        } else if (this.dummy.isHurt && this.dummy.body.blocked.down && this.dummy.currHP <= 0)
        {
            // console.log('DUMMY DIE NOW')
            // this.dummy.scene.GROUP_training_dummy.killAndHide(this.dummy)
            // this.dummy.scene.GROUP_training_dummy.remove(this.dummy)
            this.dummy.clearTint()
            this.particleTimerEvent.destroy()
            this.dummy.controlState.setState('death_sequence')
        }

        if (this.dummy.body.velocity.y < 0 && !this.dummy.body.blocked.down)
        {
            this.dummy.setGravityY(GameOptions.playerGravity * 2)
            this.dummy.setDrag(0.875)
        }
    }
    
    dummyTakeDamage (player, dummy)
    {
        if (this.dummy.isHurt)
        {
            return
        }
        else
        {
            this.dummy.isHurt = true
            // console.log('DUMMY BEEN HIT BY PLAYER')

            // TAKE DAMAGE
            this.dummy.currHP -= 1
            // KNOCKBACK SETUP
            this.dummy.setGravityY(GameOptions.playerGravity / 2)
            let recoil = 400
            let xMult = 1.8
            let yMult = 2
            let xVel = 0
            this.dummy.scene.player.body.x < this.dummy.body.x ? xVel = recoil * xMult : xVel = -recoil * xMult
            let yVel = -recoil * yMult
            this.dummy.setVelocity(xVel, yVel)

            this.dummy.setDamping(true)
            this.dummy.setDrag(0.6)

            // SPRITE FLASH EFFECT
            // this.dummy.setTintFill(0xffffff);
            // this.dummy.scene.tweens.add({
            //     targets: this.dummy,
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
            this.dummy.scene.cameras.main.shake(100, 0.0025)
        }
    }
    
    recoverFromHit ()
    {
        this.dummy.isHurt = false
        this.dummy.setGravityY(GameOptions.playerGravity)
        this.particleTimerEvent.destroy()
        this.dummy.setDamping(false)
        this.dummy.setDrag(1)
        this.tween_sprite_flash.stop()
        this.dummy.setAlpha(1)
        // this.dummy.clearTint()
        this.dummy.controlState.setState('idle')
    }

    spriteFlash()
    {
        // SPRITE FLASH EFFECT
        this.dummy.setTintFill(0xffffff)
        // this.dummy.setTint(0xffffff)
        this.tween_sprite_flash = this.dummy.scene.tweens.add({
            targets: this.dummy,
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