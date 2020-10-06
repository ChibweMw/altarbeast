import GameOptions from './GameOptions.js'
import Game from '../scenes/Game.js'

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @param {Game} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string | number} frame
     */
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)

        this.scene = scene
        
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)

        

        this.hitBox = this.scene.add.zone(this.body.x, this.body.y, 16, 32)
        this.scene.add.existing(this.hitBox)
        this.scene.physics.world.enable(this.hitBox)
        this.hitBox.setOrigin(0, 1)

        this.hurtBox = this.scene.add.zone(this.body.x, this.body.y - 32, 48, 16)
        this.scene.add.existing(this.hurtBox)
        this.scene.physics.world.enable(this.hurtBox)
        this.hurtBox.setOrigin(0, 0)

        this.hurtBox.body.checkCollision.none = true
        this.hurtBox.body.x = this.body.x - this.hurtBox.width

        this.controlState = undefined
        this.animState = undefined
        this.audioState = undefined

        // this.setFrame('oni-idle')

        this.playerGravity =  GameOptions.playerGravity
        // this.playerJumpForce = GameOptions.playerJumpForce
        // this.playerJumpCount = GameOptions.playerJumpCount

        this.jumpCount = 0

        this.walkSpeed = 0
        this.jumpVelocity = GameOptions.playerJumpVel
        this.atkActiveTime = 300
        this.HP = 3
        this.AP = 3
        this.isHurt = false
        this.hurtTime = 120
        this.hurtForce = -120
        this.isAttacking = false
        this.jumpPressed = false
        // this.currentFrame
        // this.currentAnimation
        // this.isAlive
        // this.isInvincible
        // this.canControl
        // this.canCombo
        // this.canAttack
        // this.usingAbility
        // this.isJumping
        // this.jumpBufferTime

        // this.onGround

        // this.hurtBoxX
        // this.hurtBoxY
        // this.hurtBoxWidth
        // this.hurtBoxHeight  

        this.setGravityY(this.playerGravity)
        this.setCollideWorldBounds(true)
        this.setSize(16, 2)
        this.setOffset(0, 32-2)

    }

    setControlState(controlState)
    {
        this.controlState = controlState
    }
    setAnimState(animState)
    {
        this.animState = animState
    }
    setAudioState(audioState)
    {
        this.audioState = audioState
    }
    

    update()
    {
        this.trackHitBox()
        this.trackHurtBox()
        // console.log(`WALKSPEED >> '${this.walkSpeed}'`)
        this.setVelocityX(this.walkSpeed)

        if (this.isHurt)
        {
            this.setVelocityY(this.jumpVelocity)
            this.scene.time.delayedCall(this.hurtTime, this.damageEnd, null, this)
        } else 
        {   
            if (this.body.blocked.down)
            {
                this.player_OnGround()
            } else
            {
                this.player_InAir()
            }
        }
    }

    player_OnGround ()
    {
        this.jumpPressed = false
        this.playerAttack_Stand()
        if (this.hurtBox.body.checkCollision.none)
        {
            this.playerMovement_Standing()
            this.playerJump()
        }
    }

    player_InAir ()
    {
        this.playerAttack_Jump()
            
        if (!this.jumpPressed)
        {
            this.scene.player_CONTROLLER.setState('idle')
        } 
        this.jumpVelocity = 0
    }

    trackHitBox ()
    {
        this.hitBox.setPosition(this.body.x, this.body.y + 2)
    }

    trackHurtBox ()
    {
        this.hurtBox.setPosition(this.body.x, this.body.y - 22)
    }

    playerMovement_Standing ()
    {
        if (this.scene.player_Cursors.left.isDown)
        {
            this.scene.player_CONTROLLER.setState('left')
        } else if (this.scene.player_Cursors.right.isDown)
        {
            this.scene.player_CONTROLLER.setState('right')            
        } else
        {
            this.scene.player_CONTROLLER.setState('idle')
        }
    }

    playerJump ()
    {
        if (this.scene.key_player_B.isDown)
        {
            // console.log('player jump')
            this.scene.player_CONTROLLER.setState('jump')
        }
        this.setVelocityY(this.jumpVelocity)
    }

    playerAttack_Stand ()
    {
        if (Phaser.Input.Keyboard.JustDown(this.scene.key_player_A))
        {
            console.log('Stand ATTACK')
            this.scene.player_CONTROLLER.setState('stand_atk_norm')
            this.scene.player_CONTROLLER.setState('idle')
            this.scene.time.delayedCall(this.atkActiveTime, this.deactivatePlayerHurtbox, null, this)
        }
    }

    playerAttack_Jump ()
    {
        if (Phaser.Input.Keyboard.JustDown(this.scene.key_player_A))
        {
            console.log('Jump ATTACK')
            this.scene.player_CONTROLLER.setState('stand_atk_norm')
            this.scene.time.delayedCall(this.atkActiveTime, this.deactivatePlayerHurtbox, null, this)
        }
    }

    playerTakeDamage (hitBox, dummy)
    {
        console.log(`TEST PLAYER HIT CHECK`)
        this.player_CONTROLLER.setState('take_damage')
    }

    damageEnd ()
    {
        this.isHurt = false
    }

    deactivatePlayerHurtbox ()
    {
        console.log('DEACTIVATE PLAYER HURTBOX')
        this.hurtBox.body.checkCollision.none = true
    }
}