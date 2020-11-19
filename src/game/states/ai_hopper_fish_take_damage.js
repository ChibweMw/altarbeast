import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'
import cnf_vfx_collision_group from "../prefab_configs/cnf_vfx_collision_group.js"
import cnf_vfx_jump_group from "../prefab_configs/cnf_vfx_jump_group.js"

export default class AI_TAKE_DAMAGE

{
    /** @param {Hopper} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab

        /**@type {Phaser.Tweens.Tween} */
        this.tween_sprite_flash = undefined
        this.peaked = false
        this.particleTimerEvent = null
    }

    enter ()
    {
        // debugger

        this.prefab.setGravityY(GameOptions.playerGravity / 2)

        this.prefab.setVelocityY(0) 

        this.prefab.hitBox.body.checkCollision.none = true
        this.prefab.isHurt = true
        this.peaked = false

        this.prefab.idle_transition_Timer.remove()
        // Phaser.Time.TimerEvent
        this.prefab.scene.spawnHitVFX(this.prefab.hitBox.body.x, this.prefab.hitBox.body.y, cnf_vfx_collision_group)    
        this.handleDamage()
        this.prefab.scene.physics.pause()  
        this.prefab.scene.time.delayedCall(95, this.unFreze, null, this)
    }

    unFreze()
    {
        this.prefab.scene.physics.resume()
        // debugger
        // this.prefab.isHurt = true
        this.particleTimerEvent = this.prefab.scene.time.addEvent({delay: 60, callback: this.spawnParticle, args: null, callbackScope: this, repeat: -1})   
        this.spriteFlash()
        this.knockBack()  
    }
    spawnParticle()
    {
        if (this.prefab.body.velocity.x > 0) 
        {
            this.prefab.scene.spawnHitVFX(this.prefab.body.x + Phaser.Math.RND.integerInRange(16, 18), this.prefab.body.y, cnf_vfx_collision_group)
            this.prefab.scene.spawnHitVFX(this.prefab.body.x + Phaser.Math.RND.integerInRange(10, 18), this.prefab.body.y - Phaser.Math.RND.integerInRange(0, 8), cnf_vfx_collision_group)        
            this.prefab.scene.spawnHitVFX(this.prefab.body.x + Phaser.Math.RND.integerInRange(10, 18), this.prefab.body.y + Phaser.Math.RND.integerInRange(0, 8), cnf_vfx_collision_group)        
        } else
        {
            this.prefab.scene.spawnHitVFX(this.prefab.body.x - Phaser.Math.RND.integerInRange(8, 10), this.prefab.body.y, cnf_vfx_collision_group)
            this.prefab.scene.spawnHitVFX(this.prefab.body.x - Phaser.Math.RND.integerInRange(0, 8), this.prefab.body.y - Phaser.Math.RND.integerInRange(0, 8), cnf_vfx_collision_group)        
            this.prefab.scene.spawnHitVFX(this.prefab.body.x - Phaser.Math.RND.integerInRange(0, 8), this.prefab.body.y + Phaser.Math.RND.integerInRange(0, 8), cnf_vfx_collision_group)        
        }          
    }

    handleDamage()
    {
        this.prefab.currHP -= 1
        // debugger
        if (this.prefab.currHP < 0)
        {
            this.prefab.currHP = 0
        }
    }
    knockBack ()
    {
        // KNOCK BACK
        // debugger

        // this.player.setGravityY(GameOptions.playerGravity / 2)

        let recoil = 100
        let xMult = 1.8
        let yMult = 2
        let xVel = 0
        this.prefab.scene.player.body.x < this.prefab.body.x ? xVel = recoil * xMult : xVel = -recoil * xMult
        let yVel = -recoil * yMult
        this.prefab.setVelocity(xVel, yVel)

        // this.player.setDamping(true)
        // this.player.setDrag(0.8)
    }

    update()
    {
        // if (this.player.body.blocked.down)
        // {
        //     this.recovery()
        // }
        // if (this.player.body.velocity.y < 0)
        if (!this.peaked && this.prefab.body.velocity.y > 0)
        {
            // debugger
            this.prefab.setGravityY(GameOptions.playerGravity * 2)
            this.peaked = true
            // this.prefab.setDrag(0.875)
        } else if (this.peaked)
        {
            // debugger
            if (this.prefab.isHurt && this.prefab.body.blocked.down && this.prefab.currHP > 0)
            {
                // console.timeEnd("overlap")
                // console.log(`===============================HOPPPPPPPPPPERRRRRRRRRRRRRRR HURT`)
                this.recovery()
            } else if (this.prefab.isHurt && this.prefab.body.blocked.down && this.prefab.currHP <= 0)
            {
                // console.timeEnd("overlap")
                // debugger
                console.log(`>>>>>>>>>>>>>>>>>>> HOPOPER CURR HP${this.prefab.currHP}`)
                this.particleTimerEvent.destroy()
                this.prefab.clearTint()
                this.prefab.setAlpha(1)
    
                if (this.tween_sprite_flash) 
                { 
                    // debugger
                    this.tween_sprite_flash.stop() 
                }
                this.prefab.controlState.setState('death_sequence')
            }
        }

        // if (this.player.body.velocity.y > 0 && !this.player.body.blocked.down)
        // if (this.player.body.velocity.y > 0)
        // {
        //     debugger
        //     this.player.setGravityY(GameOptions.playerGravity * 2)
        //     // this.player.setDrag(0.875)
        // }
    }
    
    recovery()
    {
        this.particleTimerEvent.destroy()
        this.prefab.clearTint()
        
        if (this.tween_sprite_flash) 
        { 
            // debugger
            this.tween_sprite_flash.stop() 
        }
        this.prefab.isHurt = false
        this.prefab.hitBox.body.checkCollision.none = false
        this.prefab.setAlpha(1)
        this.prefab.scene.spawnHitVFX(this.prefab.body.x, this.prefab.body.y, cnf_vfx_jump_group)
        this.prefab.controlState.setState('idle')
    }
    

    spriteFlash()
    {
        // SPRITE FLASH EFFECT
        this.prefab.setTintFill(0xffffff);
        this.tween_sprite_flash = this.prefab.scene.tweens.add({
            targets: this.prefab,
            // alpha: 0,
            alpha: { from: 1, to: 0.5 },
            // tint: 0xffffff,
            duration: 50,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            repeat: 5,
        })
        // CAMERA SHAKE
        this.prefab.scene.cameras.main.shake(100, 0.0025)
    }

}