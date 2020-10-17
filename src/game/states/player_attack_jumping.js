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
        // console.log(`>>JUMP ATTACK DURATIONS ${this.player.atkActiveTime}`)
        
        this.player.isAttacking_AIR = true
        this.player.play('anim-oni-attack-jump')
        // this.player.jumpPeakThreshold = -40

        // this.player.setGravityY(0)
        // // this.player.setVelocityY(0)
        // this.player.scene.time.delayedCall(this.player.jumpHangTime, this.player.resetGravity, null, this.player)

        // ACTIVATE PLAYER ATTACK HURTBOX
        this.player.atkActiveTime = this.player.anims.currentAnim.duration
        this.player.scene.time.delayedCall(this.player.atkActiveTime / 2, this.player.activatePlayerHurtbox, null, this.player)

        this.player.scene.sound.play('player-attack') 
    }

    update ()
    {
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'anim-oni-attack-jump')
        {
            console.log(`ATTACKING`)
            if (this.player.body.velocity.y >= this.player.jumpPeakThreshold && (this.player.isJumping || this.player.isAttacking_AIR))
            {
                this.player.setGravityY(0)
                this.player.scene.time.delayedCall(this.player.jumpHangTime, this.player.resetGravity, null, this.player)
                // console.log(`REDUCE GRAVITY NOW`)
            }

            if (this.player.body.blocked.down)
            {
                this.player.walkSpeed = 0
            }
            return
        } else 
        {
            if (!this.player.body.blocked.down)
            {
                this.player.scene.player_CONTROLLER.setState('fall')
            } else
            {
                this.player.scene.player_CONTROLLER.setState('idle')
            }
        }
    }
}