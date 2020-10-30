import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class AI_TAKE_DAMAGE
{
    /** @param {Dummy} dummy*/

    constructor (dummy)
    {
        this.dummy = dummy
    }

    enter ()
    {
        console.log(`AI: ENTER STATE >> DUMMY > IDLE`)
        this.dummyTakeDamage()      
    }
    
    update()
    {
        // if (this.name && this.body.blocked.down)
        if (this.dummy.isHurt && this.dummy.body.blocked.down)
        {
            // this.setVelocityX(this.curr_walkSpeed)
            this.recoverFromHit()
        }
    }
    
    dummyTakeDamage (player)
    {
        if (this.isHurt)
        {
            return
        }
        else
        {
            this.dummy.name = 'beenhit'
            this.dummy.isHurt = true
            console.log('DUMMY BEEN HIT BY PLAYER')

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
        }
    }
    
    recoverFromHit ()
    {
        this.dummy.name = ''
        this.dummy.isHurt = false
        this.dummy.setGravityY(GameOptions.playerGravity)
        // this.dummy.clearTint()
        this.dummy.controlState.setState('idle')
    }

}