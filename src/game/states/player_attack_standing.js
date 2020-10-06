import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_ATTACK_STANDING
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> ATTCKING!`)
        this.player.hurtBox.body.checkCollision.none = false
        
    }

}