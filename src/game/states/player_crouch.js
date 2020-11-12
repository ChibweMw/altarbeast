import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class Player_Crouch
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> PLAYER 'CROUCH' STATE`)
        this.player.walkSpeed = 0
        this.player.play('anim-oni-crouch')
    }
    update ()
    {
        console.log(`CROUCH STATE UPDATE`)

        if (this.player.scene.player_Cursors.down.isDown)
        {
            this.player.walkSpeed = 0
            this.player.play('anim-oni-crouch')            
        } else 
        {
            this.player.controlState.setState('idle')
        }

        this.crouchAttack()

        this.jump()

    }

    crouchAttack()
    {
        if (Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_A))
        {
            this.player.scene.player_CONTROLLER.setState('crouch_atk_norm')
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