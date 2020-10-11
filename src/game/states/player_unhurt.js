import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_UNHURT
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        // console.log(`>> STATE: PLAYER UNHURT <<`)        
    }
    
    update ()
    {
        console.log(`>> UPDATE: PLAYER UNHURT <<`) 
        this.player.playerJump()
        if (this.player.body.blocked.down && !this.player.isAttacking_AIR)
        {
            this.player.player_OnGround()
        } else if (this.player.body.blocked.down && this.player.isAttacking_AIR)
        {
            this.player.walkSpeed = 0
        } else if (!this.player.body.blocked.down)
        {
            this.player.player_InAir()
        }       
    }
}