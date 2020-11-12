import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_MOVE_LEFT
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        // console.log(`>> PLAYER 'MOVE LEFT' STATE`)
        
        this.player.setFlipX(false)
        // this.player.hurtBox.setOrigin(1, 0)
        // this.player.hurtBox_offset = 16
        this.player.walkSpeed = -GameOptions.player_walkSpeed
        // this.player.jumpPressed ? console.log(`JUMPING MOVE LEFT`) : this.player.play('anim-oni-walk', true)
        this.player.jumpPressed ? this.jump() : this.player.play('anim-oni-walk', true)
        this.player.jumpPressed = false
        // this.player.play('anim-oni-walk', true)
        // this.player.setTexture('oni-walk', 1)
    }

    update ()
    {
        // console.log(`LEFT WALK STATE UPDATE`)
        if (this.player.body.blocked.down)
        {
            if (this.player.scene.player_Cursors.left.isDown)
            {
                this.player.walkSpeed = -GameOptions.player_walkSpeed
                this.player.play('anim-oni-walk', true)
            } else if (this.player.scene.player_Cursors.right.isDown)
            {
                this.player.controlState.setState('right')            
            } else
            {
                // this.isJumping ? console.log(`PLAYER IS JUMPING`) : console.log(`PLAYER >>> STANDING`)  
                this.player.controlState.setState('idle')
            }

            if (this.player.scene.player_Cursors.down.isDown)
            {
                this.player.controlState.setState('crouch')            
            } 
            this.normalAttack()
    
            this.jump()
        }
        else if (!this.player.body.blocked.down)
        {
            this.player.walkSpeed = 0
            this.player.controlState.setState('fall')                        
        }


    }

    normalAttack()
    {
        if (Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_A))
        {
            // console.log('Stand ATTACK')
            this.player.controlState.setState('stand_atk_norm')
            this.player.scene.time.delayedCall(this.player.atkActiveTime, this.player.deactivatePlayerHurtbox, null, this.player)
        }
    }

    jump()
    {
        // if (this.player.jumpCount > 0 && Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_B))
        if (this.player.jumpCount > 0 && (this.player.jumpPressed || Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_B)) )
        {
            // console.log('player jump')
            this.player.controlState.setState('jump')
        }

    }

}