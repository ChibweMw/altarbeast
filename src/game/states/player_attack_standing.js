import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_ATTACK_STANDING
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
        this.hurtBox_Activated = false
    }

    enter ()
    {
        // console.log(`>> STAND ATK!`)
        this.player.isAttacking = true

        this.hurtBox_Activated = false

        
        // SHOULD PROPBS TAKE THIS INTO A SEPARATE STATE
        this.player.walkSpeed = 0
        this.player.play('anim-oni-attack-stand')

        // this.player.hurtBox.anims.play('anim-oni-club-swing-01')

        // this.player.hurtBox.body.checkCollision.none = false

        // ACTIVATE PLAYER ATTACK HURTBOX
        this.player.atkActiveTime = this.player.anims.currentAnim.duration
        // this.player.scene.time.delayedCall(this.player.atkActiveTime / 2, this.player.activatePlayerHurtbox, null, this.player)
        // this.player.scene.sound.play('player-attack')

    }

    update ()
    {
        if (this.player.isHurt)
        {
            return
        }
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'anim-oni-attack-stand')
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
            this.player.deactivatePlayerHurtbox()
            this.player.controlState.setState('idle')
        }
    }

}