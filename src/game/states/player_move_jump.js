import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_MOVE_UP
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> PLAYER 'MOVE JUMP' STATE`)
        this.player.jumpVelocity = -100
    }

}