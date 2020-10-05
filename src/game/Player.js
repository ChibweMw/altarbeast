import GameOptions from './GameOptions.js'

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string | number} frame
     */
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)
        
        scene.physics.add.existing(this)
        scene.add.existing(this)
        scene.physics.world.enable(this)

        this.controlState = undefined
        this.animState = undefined
        this.audioState = undefined

        // this.setFrame('oni-idle')

        this.playerGravity =  GameOptions.playerGravity
        // this.playerJumpForce = GameOptions.playerJumpForce
        // this.playerJumpCount = GameOptions.playerJumpCount

        this.jumpCount = 0

        // this.HP
        // this.AP
        // this.currentFrame
        // this.currentAnimation
        this.walkSpeed = 0
        this.jumpVelocity = GameOptions.playerJumpVel
        // this.isHurt
        // this.hurtTime
        // this.isAlive
        // this.isInvincible
        // this.canControl
        // this.canCombo
        // this.canAttack
        // this.isAttacking
        // this.attackBufferTime
        // this.usingAbility
        // this.isJumping
        // this.jumpPressed
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
        // this.body.checkCollision.up = false
        // this.body.checkCollision.left = false
        // this.body.checkCollision.right = false
        // this.body.checkCollision.down = true


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
        // console.log(`WALKSPEED >> '${this.walkSpeed}'`)
        
        this.setVelocityX(this.walkSpeed)
        if (this.body.blocked.down)
        {
            this.setVelocityY(this.jumpVelocity)
        }
    }
}