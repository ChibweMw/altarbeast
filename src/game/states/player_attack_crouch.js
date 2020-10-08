import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_ATTACK_CROUCHING
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> NORMAL CROUCH ATK!`)
        
        this.player.isAttacking = true
        this.player.play('anim-oni-attack-crouch', true)
        this.player.hurtBox.body.checkCollision.none = false
        this.player.atkActiveTime = this.player.anims.currentAnim.duration
        console.log(`${this.player.atkActiveTime}`)

        this.player.scene.sound.play('player-attack') 
    }
}