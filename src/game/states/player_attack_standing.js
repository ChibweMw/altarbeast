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
        this.player.play('anim-oni-attack-stand')
        // this.player.hurtBox.body.checkCollision.none = false

        // ACTIVATE PLAYER ATTACK HURTBOX
        this.player.atkActiveTime = this.player.anims.currentAnim.duration
        this.player.scene.time.delayedCall(this.player.atkActiveTime / 2, this.player.activatePlayerHurtbox, null, this.player)


        this.player.scene.sound.play('player-attack')
    }

}