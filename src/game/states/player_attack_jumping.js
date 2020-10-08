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
        console.log(`>>JUMP ATTACK DURATIONS ${this.player.atkActiveTime}`)
        
        this.player.isAttacking_AIR = true
        this.player.play('anim-oni-attack-jump')
        
        // ACTIVATE PLAYER ATTACK HURTBOX
        this.player.atkActiveTime = this.player.anims.currentAnim.duration
        this.player.scene.time.delayedCall(this.player.atkActiveTime / 2, this.player.activatePlayerHurtbox, null, this.player)

        this.player.scene.sound.play('player-attack') 
    }
}