import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_ATTACK_CROUCHING
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
        this.hurtBox_Activated = false

    }

    enter ()
    {
        // console.log(`>> NORMAL CROUCH ATK!`)
        
        this.player.isAttacking = true

        this.hurtBox_Activated = false

        this.player.play('anim-oni-attack-crouch', true)
        // ACTIVATE PLAYER ATTACK HURTBOX
        this.player.atkActiveTime = this.player.anims.currentAnim.duration
        // this.player.scene.time.delayedCall(this.player.atkActiveTime / 2, this.player.activatePlayerHurtbox, null, this.player)

        // console.log(`${this.player.atkActiveTime}`)

        // this.player.scene.sound.play('player-attack') 
    }

    update ()
    {
        // console.log(`CROUCH ATTACK STATE UPDATE`)
        if (this.player.isHurt)
        {
            return
        }
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'anim-oni-attack-crouch')
        {
            // console.log(`ATTACKING`)
            if (!this.hurtBox_Activated && this.player.anims.currentFrame.index > 2 && this.player.anims.currentFrame.index < (this.player.anims.currentAnim.frames.length - 1))
            {
                this.hurtBox_Activated = true

                this.player.activatePlayerHurtbox()
            } else if (this.player.anims.currentFrame.index >= (this.player.anims.currentAnim.frames.length - 1)) {
                this.player.hurtBox.body.checkCollision.none = true

            }
            return
        } else
        {
            // this.player.scene.player_CONTROLLER.setState('crouch')
            this.player.deactivatePlayerHurtbox()
            this.player.controlState.setState('crouch')
        }
    }
}