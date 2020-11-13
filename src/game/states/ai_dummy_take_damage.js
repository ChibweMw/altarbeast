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
    }

    enter ()
    {
        // console.log(`AI: ENTER STATE >> DUMMY > TAKE DAMAGE`)
        this.dummy.scene.spawnHitVFX(this.dummy.body.x, this.dummy.body.y, 'fx-hit-connect')        
        this.dummyTakeDamage()      
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
            let recoil = 450
            let xMult = 1.8
            let yMult = 1.6
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
        this.dummy.setTintFill(0xffffff);
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