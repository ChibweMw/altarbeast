import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_ATTACK_JUMPING
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
        this.hurtBox_Activated = false
    }

    enter ()
    {
        // console.log(`>>JUMP ATTACK DURATIONS ${this.player.atkActiveTime}`)
        
        this.player.isAttacking_AIR = true

        this.hurtBox_Activated = false

        this.player.play('anim-oni-attack-jump')
        // this.player.jumpPeakThreshold = -40

        // this.player.setGravityY(0)
        // // this.player.setVelocityY(0)
        // this.player.scene.time.delayedCall(this.player.jumpHangTime, this.player.resetGravity, null, this.player)

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
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'anim-oni-attack-jump')
        {
            // console.log(`ATTACKING`)
            if (this.player.body.velocity.y >= this.player.jumpPeakThreshold && (this.player.isJumping || this.player.isAttacking_AIR))
            {
                this.player.setGravityY(0)
                this.player.scene.time.delayedCall(this.player.jumpHangTime, this.player.resetGravity, null, this.player)
                // console.log(`REDUCE GRAVITY NOW`)
            }

            // SHOULD PLAYER LAND IN THE MIDDLE OF AN AIR ATTACK
            if (this.player.body.blocked.down)
            {
                this.hurtBox_offsetY = 5
                this.player.walkSpeed = 0
            }

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
            // this.player.isAttacking_AIR = false
            this.player.deactivatePlayerHurtbox()


            if (!this.player.body.blocked.down)
            {
                this.player.controlState.setState('fall')
            } else
            {
                // PLACE CHECK FOR JUMP BUTTON HERE
                this.player.controlState.setState('idle')
            }
        }
    }
}