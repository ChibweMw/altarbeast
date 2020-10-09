import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_Crouch
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> PLAYER 'CROUCH' STATE`)
        this.player.walkSpeed = 0
        this.player.play('anim-oni-crouch')
    }
    update ()
    {
        console.log(`CROUCH STATE UPDATE`)
    }

}