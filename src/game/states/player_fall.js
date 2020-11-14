import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_FALL
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        this.player.play('anim-oni-jump')

        // this.player.walkSpeed = 0
        
        console.log(`>> PLAYER 'FALL' STATE `)
    }
    
    update ()
    {
        // console.log(`FALL STATE UPDATE`)
        
        if (!this.player.body.blocked.down) 
        {
            // this.player.play('anim-oni-jump')
            if (this.player.body.velocity.y >= this.player.jumpPeakThreshold && (this.player.isJumping || this.player.isAttacking_AIR))
            {
                // console.log(`REDUCE GRAVITY NOW`)
                this.player.setGravityY(0)
                // this.player.setVelocityY(0)
                this.player.scene.time.delayedCall(this.player.jumpHangTime, this.player.resetGravity, null, this.player)
                
                this.player.controlState.setState('fall')
            }
            
            this.jump()
            this.airAttack()
            return
        } else 
        {
            // PLACE CHECK FOR JUMP BUTTON HERE
            // this.player.scene.spawnHitVFX(this.player.body.x, this.player.body.y + 16, 'fx-player-land')
            this.player.controlState.setState('idle')
        }
        
    }

    jump()
    {
        if (this.player.jumpCount > 0 && Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_B))
        {
            if (this.player.scene.player_Cursors.left.isDown)
            {
                this.player.walkSpeed = -GameOptions.player_walkSpeed
            } else if (this.player.scene.player_Cursors.right.isDown)
            {
                this.player.walkSpeed = GameOptions.player_walkSpeed
            } 
            // console.log('player jump')
            this.player.controlState.setState('jump')
        } else  if (this.player.jumpCount <= 0 && Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_B))
        {
            console.log(`JUMPPRESSED DURING FALL`)
            this.player.jumpPressed = true
            this.player.scene.time.delayedCall(this.player.jumpPressBufferTime, this.resetJumpPress, null, this)
            
        }
    }
    
    resetJumpPress()
    {
        this.player.jumpPressed = false        
        console.log(`JUMPPRESSED RESET`)
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

}