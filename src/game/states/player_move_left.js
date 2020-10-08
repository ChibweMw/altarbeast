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
        // console.log(`>> PLAYER 'MOVE LEFT' STATE`)
        
        this.player.setFlipX(false)
        // this.player.hurtBox.setOrigin(1, 0)
        // this.player.hurtBox_offset = 16
        this.player.walkSpeed = -80
        this.player.play('anim-oni-walk')
        // this.player.setTexture('oni-walk', 1)
    }

}