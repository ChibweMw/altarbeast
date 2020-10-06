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
        this.player.walkSpeed = this.player.hurtForce
        this.player.jumpVelocity = this.player.hurtForce
    }

}