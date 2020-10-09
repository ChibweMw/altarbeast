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
        // console.log(`>> NORMAL CROUCH ATK!`)
        
        this.player.isAttacking = true
        this.player.play('anim-oni-attack-crouch', true)
        // ACTIVATE PLAYER ATTACK HURTBOX
        this.player.atkActiveTime = this.player.anims.currentAnim.duration
        this.player.scene.time.delayedCall(this.player.atkActiveTime / 2, this.player.activatePlayerHurtbox, null, this.player)

        // console.log(`${this.player.atkActiveTime}`)

        this.player.scene.sound.play('player-attack') 
    }

    update ()
    {
        console.log(`CROUCH ATTACK STATE UPDATE`)
    }
}