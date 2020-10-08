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
        this.player.play('anim-oni-jump')

        // console.log(`>> PLAYER MOVE 'JUMP' STATE `)
        // console.log(`>> JUMP COUNT ${this.player.jumpCount}`)
        this.player.jumpCount -= 1
        // console.log(`>> JUMP COUNT ${this.player.jumpCount}`)

        this.player.isJumping = true
        this.player.jumpPressed = true
        this.player.jumpVelocity = GameOptions.playerJumpVel
        // this.player.setVelocityY(this.player.jumpVelocity)
        // console.log(`>> JUMP FORCE ${this.player.jumpVelocity}`)
    }

}