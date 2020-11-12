import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_MOVE_JUMP
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        this.player.scene.spawnHitVFX(this.player.body.x, this.player.body.y + 16, 'fx-player-jump')
        if (!this.player.isAttacking_AIR){
            this.player.play('anim-oni-jump')
            console.log(`>> PLAYER MOVE 'JUMP' STATE `)
            // console.log(`>> JUMP COUNT BEFORE ${this.player.jumpCount}`)
            this.player.jumpCount -= 1
            // console.log(`>> JUMP COUNT AFTER ${this.player.jumpCount}`)
            
            this.player.isJumping = true
            this.player.jumpPressed = true
            this.resetJumpPress()
            this.player.jumpVelocity = GameOptions.playerJumpVel
            this.player.setVelocityY(this.player.jumpVelocity)
        }
        // console.log(`>> JUMP FORCE ${this.player.jumpVelocity}`)
    }
    
    update ()
    {
        // console.log(`JUMP STATE UPDATE`) 
        
        if (!this.player.body.blocked.down) 
        {
            // this.player.play('anim-oni-jump')
            if (this.player.body.velocity.y >= this.player.jumpPeakThreshold && (this.player.isJumping || this.player.isAttacking_AIR))
            {
                // // console.log(`REDUCE GRAVITY NOW`)
                // this.player.setGravityY(0)
                // // this.player.setVelocityY(0)
                // this.player.scene.time.delayedCall(this.player.jumpHangTime, this.player.resetGravity, null, this.player)
                
                this.player.controlState.setState('fall')
            }
            this.airAttack()
            return
        } else 
        {
            // PLACE CHECK FOR JUMP BUTTON HERE
            this.player.controlState.setState('idle')
        }
        
    }

    airAttack()
    {
        if (Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_A))
        {
            // console.log(`>>> IS ATTACKING AIR : ${this.player.isAttacking_AIR}`)
            this.player.controlState.setState('jump_atk_norm')
            this.player.scene.time.delayedCall(this.player.atkActiveTime, this.player.deactivatePlayerHurtbox, null, this.player)
        }
    }

    resetJumpPress()
    {
        this.player.jumpPressed = false        
        console.log(`JUMPPRESSED RESET`)
    }

}