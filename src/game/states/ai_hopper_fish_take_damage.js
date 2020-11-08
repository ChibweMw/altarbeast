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
    }

    enter ()
    {
        // console.log(`AI: ENTER STATE >> DUMMY > TAKE DAMAGE`)
        this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y, 'fx-hit-connect')        
        this.dummyTakeDamage()      
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
            this.hopper.controlState.setState('death_sequence')
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
            let recoil = 100
            let xMult = 1
            let yMult = 2
            let xVel = 0
            this.hopper.scene.player.body.x < this.hopper.body.x ? xVel = recoil * xMult : xVel = -recoil * xMult
            let yVel = -recoil * yMult
            this.hopper.setVelocity(xVel, yVel)

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