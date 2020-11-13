import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_TAKE_DAMAGE
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player

        /**@type {Phaser.Tweens.Tween} */
        this.tween_sprite_flash = undefined
    }

    enter ()
    {
        // console.log(`>> TAKING DAMAGE`)
        // this.player.isHurt = true
        this.player.scene.spawnHitVFX(this.player.hitBox.body.x, this.player.hitBox.body.y, 'fx-hit-connect')    
        this.player.play('anim-oni-attack-hurt')
        
        
        // this.spriteFlash()

        // // KNOCK BACK
        // this.player.setGravityY(GameOptions.playerGravity / 2)
        // let hurtForce_X = this.player.flipX ? this.player.hurtForce : -this.player.hurtForce
        // let hurtForce_Y = this.player.hurtForce
        // let xMult = 1
        // let yMult = 2
        // this.player.walkSpeed = hurtForce_X *xMult
        // this.player.jumpVelocity = hurtForce_Y * yMult
        // this.player.setVelocityY(this.player.jumpVelocity)
        
        // this.knockBack()
        
        // HP CALC
        // console.log(`>> Player HP : ${this.player.HP}`)
        // this.player.HP -= this.player.dmgTaken
        // // console.log(`>> Damage DAMAGE : ${this.player.dmgTaken}`)
        // // console.log(`>> Player HP : ${this.player.HP}`)
        
        
        // if (this.player.HP < 0)
        // {
        //     this.player.HP = 0
        // }
        // this.player.dmgTaken = 0
        this.handleDamage()
        this.player.scene.physics.pause()  
        this.player.scene.time.delayedCall(95, this.unFreze, null, this)
    }

    unFreze()
    {
        this.player.scene.physics.resume()
        this.player.isHurt = true
        this.spriteFlash()
        this.knockBack()  
        // this.particleTimerEvent = this.dummy.scene.time.addEvent({delay: 60, callback: this.spawnParticle, args: null, callbackScope: this, repeat: -1})   
    }

    handleDamage()
    {
        this.player.HP -= this.player.dmgTaken
        
        if (this.player.HP < 0)
        {
            this.player.HP = 0
        }
        this.player.dmgTaken = 0
    }

    knockBack ()
    {
        // KNOCK BACK
        this.player.setGravityY(GameOptions.playerGravity / 2)
        let hurtForce_X = this.player.flipX ? this.player.hurtForce : -this.player.hurtForce
        let hurtForce_Y = this.player.hurtForce
        let xMult = 1
        let yMult = 2
        this.player.walkSpeed = hurtForce_X *xMult
        this.player.jumpVelocity = hurtForce_Y * yMult
        this.player.setVelocityY(this.player.jumpVelocity)
    }

    update()
    {
        // if (this.player.body.blocked.down)
        // {
        //     this.recovery()
        // }
        if (this.player.isHurt && this.player.body.blocked.down && this.player.HP > 0)
        {
            this.recovery()
        } else if (this.player.isHurt && this.player.body.blocked.down && this.player.HP <= 0)
        {
            console.log(`PLAYER DEATH SEQUENCE`)
            this.player.controlState.setState('death')
        }
    }
    
    recovery()
    {
        this.player.clearTint()
        this.tween_sprite_flash.stop()
        this.player.isHurt = false
        this.player.setAlpha(1)
        this.player.scene.spawnHitVFX(this.player.body.x, this.player.body.y + 16, 'fx-player-jump')
        this.player.controlState.setState('idle')
    }
    

    spriteFlash()
    {
        // SPRITE FLASH EFFECT
        this.player.setTintFill(0xffffff);
        this.tween_sprite_flash = this.player.scene.tweens.add({
            targets: this.player,
            // alpha: 0,
            alpha: { from: 1, to: 0.5 },
            // tint: 0xffffff,
            duration: 50,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            repeat: 5,
        })
        // CAMERA SHAKE
        this.player.scene.cameras.main.shake(100, 0.0025)
    }

}