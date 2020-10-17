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
        this.player.walkSpeed = 0
        this.player.jumpCount = GameOptions.player_JumpCount
        // !this.player.jumpCount ? this.player.jumpCount = 1 : console.log(`can already jump`) 

        this.player.jumpPressed ? console.log(`JUMPING`) : this.player.play('anim-oni-idle', true)
        this.player.jumpPressed = false
        
    }
    
    update ()
    {
        console.log(`IDLE UPDATE STATE`)
        // this.player.jumpPressed ? console.log(`JUMPING`) : this.player.play('anim-oni-idle', true)
        // this.player.jumpPressed = false
        // this.player.play('anim-oni-idle', true)
        
        if (this.player.scene.player_Cursors.left.isDown)
        {
            this.player.scene.player_CONTROLLER.setState('left')
        } else if (this.player.scene.player_Cursors.right.isDown)
        {
            this.player.scene.player_CONTROLLER.setState('right')            
        } else
        {
            // this.isJumping ? console.log(`PLAYER IS JUMPING`) : console.log(`PLAYER >>> STANDING`)  
            // this.player.scene.player_CONTROLLER.setState('idle')
            this.player.play('anim-oni-idle', true)
        }

        if (this.player.scene.player_Cursors.down.isDown)
        {
            this.player.scene.player_CONTROLLER.setState('crouch')            
        } 

        this.normalAttack()

        this.jump()

    }

    normalAttack()
    {
        if (Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_A))
        {
            // console.log('Stand ATTACK')
            this.player.scene.player_CONTROLLER.setState('stand_atk_norm')
            this.player.scene.time.delayedCall(this.player.atkActiveTime, this.player.deactivatePlayerHurtbox, null, this.player)
        }
    }

    jump()
    {
        if (this.player.jumpCount > 0 && Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_B))
        {
            // console.log('player jump')
            this.player.scene.player_CONTROLLER.setState('jump')
        }

    }

}