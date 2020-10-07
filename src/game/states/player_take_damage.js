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
        this.player.walkSpeed = hurtForce_X
        this.player.jumpVelocity = hurtForce_Y

        // HP CALC
        console.log(`>> Player HP : ${this.player.HP}`)
        this.player.HP -= this.player.dmgTaken
        console.log(`>> Damage DAMAGE : ${this.player.dmgTaken}`)
        console.log(`>> Player HP : ${this.player.HP}`)
        this.player.setTexture('oni-attack-hurt')
        this.player.dmgTaken = 0

    }

}