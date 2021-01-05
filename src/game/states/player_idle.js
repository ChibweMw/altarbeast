import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_Idle
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        // console.log(`>> PLAYER 'IDLE' STATE`)

        /**
         * This resetting should be moved to an 'exit' function for further separation of concerns
         */
        this.player.jumpCount = GameOptions.player_JumpCount
        this.player.setGravityY(GameOptions.playerGravity)

        this.player.hurtBox_offsetY = 16
        this.player.setSize(16, 32)
        this.player.setOffset(16, 16)
        this.player.hitBox.body.height = 32
        this.player.hitBox.setSize(8, 32)
        
        // !this.player.jumpCount ? this.player.jumpCount = 1 : console.log(`can already jump`) 
        
        if (this.player.jumpPressed)
        {
            this.jump()
        } else {
            this.player.walkSpeed = 0
            this.player.play('anim-oni-idle', true)
        }
        // this.player.jumpPressed ? console.log(`JUST JUMPED`) : this.player.play('anim-oni-idle', true)
        // this.player.jumpPressed ? this.jump() : this.player.play('anim-oni-idle', true)
        this.player.jumpPressed = false
        this.player.isJumping = false
        
    }
    
    update ()
    {
        // console.log(`IDLE UPDATE STATE`)
        // this.player.jumpPressed ? console.log(`JUMPING`) : this.player.play('anim-oni-idle', true)
        // this.player.jumpPressed = false
        // this.player.play('anim-oni-idle', true)
        // if (this.player.body.blocked.down)
        if (this.player.body.blocked.down || this.player.body.touching.down)
        {
            if (this.player.scene.player_Cursors.left.isDown)
            {
                this.player.controlState.setState('left')
            } else if (this.player.scene.player_Cursors.right.isDown)
            {
                this.player.controlState.setState('right')            
            } else
            {
                // this.isJumping ? console.log(`PLAYER IS JUMPING`) : console.log(`PLAYER >>> STANDING`)  
                // this.player.controlState.setState('idle')
                this.player.play('anim-oni-idle', true)
            }

            if (this.player.scene.player_Cursors.down.isDown)
            {
                this.player.controlState.setState('crouch')            
            } 
            this.normalAttack()
            this.jump()
        } else // if (!this.player.body.blocked.down)
        {
            this.player.controlState.setState('fall')                        
        }



    }

    normalAttack()
    {
        if (Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_A))
        {
            // console.log('Stand ATTACK')
            this.player.controlState.setState('stand_atk_norm')
            // this.player.scene.time.delayedCall(this.player.atkActiveTime, this.player.deactivatePlayerHurtbox, null, this.player)
        }
    }

    jump()
    {
        if (this.player.jumpCount > 0 && (this.player.jumpPressed || Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_B)) )
        {
            // console.log('player jump')
            if (this.player.scene.player_Cursors.left.isDown)
            {
                this.player.setFlipX(false)
                this.player.walkSpeed = -GameOptions.player_walkSpeed
            } else if (this.player.scene.player_Cursors.right.isDown)
            {
                this.player.setFlipX(true)
                this.player.walkSpeed = GameOptions.player_walkSpeed
            } 
            this.player.controlState.setState('jump')
        }

    }

}