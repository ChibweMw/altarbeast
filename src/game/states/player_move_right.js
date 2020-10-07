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
        // console.log(`>> PLAYER 'MOVE RIGHT' STATE`)
        
        this.player.setFlipX(true)
        // this.player.hurtBox.setOrigin(0, 0)
        this.player.hurtBox_offset = 0
        this.player.walkSpeed = 80
        this.player.setTexture('oni-walk', 1)
    }
}