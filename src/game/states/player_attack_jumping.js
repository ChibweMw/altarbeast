import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_ATTACK_JUMPING
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        // console.log(`>> NORMAL JUMP ATK!`)
        
        this.player.isAttacking_AIR = true
        this.player.play('anim-oni-attack-jump', true)
        // ACTIVATE PLAYER ATTACK HURTBOX
        this.player.atkActiveTime = this.player.anims.currentAnim.duration
        this.player.scene.time.delayedCall(this.player.atkActiveTime / 2, this.player.activatePlayerHurtbox, null, this.player)
        // console.log(`${this.player.atkActiveTime}`)

        this.player.scene.sound.play('player-attack') 
    }
}