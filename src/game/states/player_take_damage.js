import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_TAKE_DAMAGE
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> TAKING DAMAGE`)
        this.player.isHurt = true

        let hurtForce_X = this.player.flipX ? this.player.hurtForce : -this.player.hurtForce
        let hurtForce_Y = this.player.hurtForce

        // KNOCK BACK
        this.player.walkSpeed = hurtForce_X * 1.7
        this.player.jumpVelocity = hurtForce_Y * 2
        this.player.setVelocityY(this.player.jumpVelocity)


        // HP CALC
        console.log(`>> Player HP : ${this.player.HP}`)
        this.player.HP -= this.player.dmgTaken
        console.log(`>> Damage DAMAGE : ${this.player.dmgTaken}`)
        console.log(`>> Player HP : ${this.player.HP}`)
        
        this.player.play('anim-oni-attack-hurt')
        this.player.scene.time.delayedCall(this.player.hurtTime, this.recovery, null, this)

        this.player.dmgTaken = 0


    }

    update()
    {
        console.log(`taking damage update`)
        // this.recovery()
    }

    recovery()
    {
        this.player.scene.player_CONTROLLER.setState('idle')
    }

}