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
        // console.log(`>> STAND ATK!`)
        this.player.isAttacking = true
        
        // SHOULD PROPBS TAKE THIS INTO A SEPARATE STATE
        this.player.walkSpeed = 0
        this.player.play('anim-oni-attack-stand', true)
        this.player.hurtBox.body.checkCollision.none = false
        console.log(`${this.player.atkActiveTime}`)
        this.player.atkActiveTime = this.player.anims.currentAnim.duration
        console.log(`${this.player.atkActiveTime}`)

        this.player.scene.sound.play('player-attack')
    }

}