import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_MOVE_RIGHT
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> PLAYER 'MOVE RIGHT' STATE`)
        this.player.walkSpeed = 80
    }

}