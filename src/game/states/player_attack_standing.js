import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_ATTACK_STANDING
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> STAND ATK!`)
        this.player.isAttacking = true
        this.player.hurtBox.body.checkCollision.none = false
        
        // SHOULD PROPBS TAKE THIS INTO A SEPARATE STATE
        this.player.walkSpeed = 0
        this.player.setTexture('oni-attack-stand', 2)
        this.player.scene.sound.play('player-attack')


        console.log(`PLAYER X ${this.player.x}`)
        console.log(`PLAYER BODY X ${this.player.body.x}`)
        console.log(`PLAYER Y ${this.player.y}`)
        console.log(`PLAYER BODY Y ${this.player.body.y}`)
        console.log(`FRAME Y ${this.player.frame.y}`)

        

        
    }

}