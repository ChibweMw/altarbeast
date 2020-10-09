import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_Idle
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        // console.log(`>> PLAYER 'IDLE' STATE`)
        this.player.walkSpeed = 0
        // this.player.play('anim-oni-idle', true)
        // this.player.play('anim-oni-idle', true)

        this.player.jumpPressed ? console.log(`JUMPING`) : this.player.play('anim-oni-idle', true)
        this.player.jumpPressed = false
        
    }
    
    update ()
    {
        console.log(`IDLE UPDATE STATE`)
        // this.player.jumpPressed ? console.log(`JUMPING`) : this.player.play('anim-oni-idle', true)
        // this.player.jumpPressed = false
        this.player.play('anim-oni-idle', true)
    }

}