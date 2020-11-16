import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'
import cnf_vfx_collision_group from "../prefab_configs/cnf_vfx_collision_group.js"

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
        this.hopper.clearTint()
        // this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y, 'fx-hit-connect') // fx-hit-enemy-death 
        this.hopper.scene.spawnHitVFX(this.hopper.body.x, this.hopper.body.y, cnf_vfx_collision_group) // fx-hit-enemy-death 
        this.spawnParticle()      
        // this.hopper.currHP -= 1
        // this.dummyTakeDamage()  
        // this.particleTimerEvent = this.hopper.scene.time.addEvent({delay: 60, callback: this.spawnParticle, args: null, callbackScope: this, repeat: -1})   
        this.hopper.scene.physics.pause()  
        this.hopper.scene.time.delayedCall(75, this.unFreze, null, this)
    }
    
    unFreze()
    {
        this.hopper.scene.physics.resume()
        // this.dummyTakeDamage()
        this.hopper.scene.cameras.main.shake(100, 0.0025, true)
        // this.particleTimerEvent = this.hopper.scene.time.addEvent({delay: 160, callback: this.spawnParticle, args: null, callbackScope: this, repeat: -1}) 
        // this.hopper.isHurt = true
        console.log(`AI: KNOCKBACK`)
        if (!this.hopper.isHurt)
        {
            this.hopper.isHurt = true
            this.particleTimerEvent = this.hopper.scene.time.addEvent({delay: 60, callback: this.spawnParticle, args: null, callbackScope: this, repeat: -1})   
            this.handleDamage()
            this.spriteFlash()
            this.knockBack()  
        }

    }
    knockBack (player, hopper)
    {
        // KNOCK BACK
        this.hopper.setGravityY(GameOptions.playerGravity / 2)
        let recoil = 200
        let xMult = 1.8
        let yMult = 1.6
        let xVel = 0
        this.hopper.scene.player.body.x < this.hopper.body.x ? xVel = recoil * xMult : xVel = -recoil * xMult
        let yVel = -recoil * yMult
        this.hopper.setVelocity(xVel, yVel)

        this.hopper.setDamping(true)
        this.hopper.setDrag(0.8)

        // console.log(`AI: KNOCKBACK`)
        // if (!this.hopper.body.blocked.down)
        // {

        //     this.hopper.isHurt = true
        // }
        // this.hopper.setGravityY(GameOptions.playerGravity / 2)
        // let hurtForce_X = this.hopper.flipX ? this.hopper.hurtForce : -this.hopper.hurtForce
        // let hurtForce_Y = this.hopper.hurtForce
        // let xMult = 1
        // let yMult = 2
        // this.hopper.walkSpeed = hurtForce_X *xMult
        // this.hopper.jumpVelocity = hurtForce_Y * yMult
        // this.hopper.setVelocityY(this.hopper.jumpVelocity)
    }

    handleDamage()
    {
        
        // this.player.HP -= this.player.dmgTaken
        this.hopper.currHP -= 1
        
        if (this.hopper.currHP < 0)
        {
            this.hopper.currHP = 0
        }
        // this.player.dmgTaken = 0
    }

    spawnParticle()
    {
        if (this.hopper.body.velocity.x > 0) 
        {
            this.hopper.scene.spawnHitVFX(this.hopper.body.x + Phaser.Math.RND.integerInRange(16, 18), this.hopper.body.y, cnf_vfx_collision_group)
            this.hopper.scene.spawnHitVFX(this.hopper.body.x + Phaser.Math.RND.integerInRange(10, 18), this.hopper.body.y - Phaser.Math.RND.integerInRange(0, 8), cnf_vfx_collision_group)        
            this.hopper.scene.spawnHitVFX(this.hopper.body.x + Phaser.Math.RND.integerInRange(10, 18), this.hopper.body.y + Phaser.Math.RND.integerInRange(0, 8), cnf_vfx_collision_group)        
        } else
        {
            this.hopper.scene.spawnHitVFX(this.hopper.body.x - Phaser.Math.RND.integerInRange(8, 10), this.hopper.body.y, cnf_vfx_collision_group)
            this.hopper.scene.spawnHitVFX(this.hopper.body.x - Phaser.Math.RND.integerInRange(0, 8), this.hopper.body.y - Phaser.Math.RND.integerInRange(0, 8), cnf_vfx_collision_group)        
            this.hopper.scene.spawnHitVFX(this.hopper.body.x - Phaser.Math.RND.integerInRange(0, 8), this.hopper.body.y + Phaser.Math.RND.integerInRange(0, 8), cnf_vfx_collision_group)        
        }          
    }
    
    update()
    {
        
        // if (this.name && this.body.blocked.down)
        // } else if (this.hopper.isHurt && this.hopper.body.blocked.down || this.hopper.currHP <= 0 && this.hopper.body.blocked.down)
        // if (this.hopper.isHurt && this.hopper.body.blocked.down && this.hopper.currHP <= 0)
        if (this.hopper.isHurt && this.hopper.body.velocity.y <= 0 &&  this.hopper.body.blocked.down)
        {
            // this.hopper.isHurt = false
            if (this.hopper.currHP <= 0)
            // } else if (this.hopper.body.blocked.down || this.hopper.currHP <= 0 && this.hopper.body.blocked.down)
            {
                console.log('DUMMY DIE NOW')
    
                this.particleTimerEvent.destroy()
                // this.tween_sprite_flash.stop()
                
                this.hopper.clearTint()
                this.hopper.controlState.setState('death_sequence')

            }else if (this.hopper.currHP > 0)
            {
                console.log('DUMMY RECOVER FROM HIT')
                this.recoverFromHit()
            }  
            // console.log('DUMMY RECOVER FROM HIT')
        }  
        
        ///////////////////
        if (this.hopper.body.velocity.y < 0 && !this.hopper.body.blocked.down)
        {
            this.hopper.setGravityY(GameOptions.playerGravity * 2)
            this.hopper.setDrag(0.875)
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
        this.hopper.clearTint()
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