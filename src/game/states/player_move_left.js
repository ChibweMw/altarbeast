import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_MOVE_LEFT
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> PLAYER 'MOVE LEFT' STATE`)
        this.player.walkSpeed = -80
    }

}