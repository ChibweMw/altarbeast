import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_MOVE_RIGHT
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        // console.log(`>> PLAYER 'MOVE RIGHT' STATE`)
        
        this.player.setFlipX(true)
        // this.player.hurtBox.setOrigin(0, 0)
        // this.player.hurtBox_offset = 16
        this.player.walkSpeed = 80
        this.player.jumpPressed ? console.log(`JUMPING MOVE RIGHT`) : this.player.play('anim-oni-walk', true)
        this.player.jumpPressed = false
        // this.player.play('anim-oni-walk', true)
        // this.player.setTexture('oni-walk', 1)
    }

    update ()
    {
        console.log(`RIGHT WALK STATE UPDATE`)

        if (this.player.scene.player_Cursors.left.isDown)
        {
            this.player.scene.player_CONTROLLER.setState('left')
        } else if (this.player.scene.player_Cursors.right.isDown)
        {
            this.player.walkSpeed = 80
            this.player.play('anim-oni-walk', true)
        } else {
            // this.isJumping ? console.log(`PLAYER IS JUMPING`) : console.log(`PLAYER >>> STANDING`)  
            this.player.scene.player_CONTROLLER.setState('idle')
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