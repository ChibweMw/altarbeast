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

        this.player.walkSpeed = 0
        
        console.log(`>> PLAYER 'FALL' STATE `)
    }
    
    update ()
    {
        // console.log(`FALL STATE UPDATE`)
        
        if (!this.player.body.blocked.down) 
        {
            // this.player.play('anim-oni-jump')
            
            this.jump()
            this.airAttack()
            return
        } else 
        {
            this.player.scene.player_CONTROLLER.setState('idle')
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
            this.player.scene.player_CONTROLLER.setState('jump')
        }
    }

    airAttack()
    {
        if (Phaser.Input.Keyboard.JustDown(this.player.scene.key_player_A))
        {
            // console.log(`>>> IS ATTACKING AIR : ${this.player.isAttacking_AIR}`)
            this.player.scene.player_CONTROLLER.setState('jump_atk_norm')
            this.player.scene.time.delayedCall(this.player.atkActiveTime, this.player.deactivatePlayerHurtbox, null, this.player)
        }
    }

}