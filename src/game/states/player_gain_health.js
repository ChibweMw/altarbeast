import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_GAIN_Health
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> Gaining Health`)
        console.log(`>> Player HP : ${this.player.HP}`)
        this.player.HP += this.player.gained_HP
        console.log(`>> Gaining - ${this.player.gained_HP} - Health`)
        console.log(`>> Player HP : ${this.player.HP}`)

        // RESET HP GAIN
        this.player.gained_HP = 0

    }

}