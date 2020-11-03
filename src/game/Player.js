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

        this.hurtBox = this.scene.add.zone(this.body.x, this.body.y + 12, 48, 32)
        this.scene.add.existing(this.hurtBox)
        this.scene.physics.world.enable(this.hurtBox)
        this.hurtBox.setOrigin(0, 0)

        this.hurtBox.body.checkCollision.none = true
        this.hurtBox.body.x = this.body.x - this.hurtBox.width
        
        this.hurtBox.body.debugBodyColor = 0xfff999
        this.hurtBox.body.debugShowBody = !this.hurtBox.body.checkCollision 

        this.controlState = undefined
        this.animState = undefined
        this.audioState = undefined

        // this.setFrame('oni-idle')

        this.playerGravity =  GameOptions.playerGravity
        // this.playerJumpForce = GameOptions.playerJumpForce
        // this.playerJumpCount = GameOptions.playerJumpCount

        
        this.walkSpeed = 0
        // this.jumpVelocity = GameOptions.playerJumpVel
        this.jumpVelocity = 0
        this.atkActiveTime = 300
        this.HP = 3
        this.AP = 3
        this.gained_HP = 0
        this.dmgTaken = 0
        this.isHurt = false
        this.hurtTime = 500
        this.hurtForce = -100
        this.hurtBox_offset = 16
        this.isAttacking = false
        this.isAttacking_AIR = false
        this.jumpPressed = false
        this.isJumping = false
        this.jumpCount = GameOptions.player_JumpCount
        this.jumpHangTime = 120
        this.jumpPeakThreshold = -20
        this.jumpPressBufferTime = 200

        this.startFallY = undefined
        this.endFallY = undefined

        // this.currentFrame
        // this.currentAnimation
        // this.isAlive
        // this.isInvincible
        // this.canControl
        // this.canCombo
        // this.canAttack
        // this.usingAbility

        // this.onGround

        // this.hurtBoxX
        // this.hurtBoxY
        // this.hurtBoxWidth
        // this.hurtBoxHeight  

        this.setGravityY(this.playerGravity)
        // this.setCollideWorldBounds(true)
        this.setCollideWorldBounds(false)
        this.setSize(16, 2)
        this.setOffset(16, this.frame.realHeight - this.body.height)
        this.setFlipX(true)
        this.setOrigin(0.5, 1)

        this.body.debugBodyColor = 0xfff999
        // this.debugBodyColor = 0x008000

        // this.scene.cameras.main.startFollow(this, true, 0.9, 1)
    }

    setControlState(controlState)
    {
        this.controlState = controlState
    }
    

    update()
    {
        this.trackHitBox()
        this.trackHurtBox()

        // console.log(`JUMP COUNT '${this.jumpCount}'`)
        // console.log(`IS JUMPING '${this.isJumping}'`)
        this.setVelocityX(this.walkSpeed)
        this.scene.player_CONTROLLER.update()
        
        this.screenWrapX()
        this.screenWrapY()

        
    }

    screenWrapX()
    {
        // if (this.body.x > this.scene.scale.width - this.body.halfWidth)
        // if (this.body.x > this.scene.cameras.main.width + this.scene.cameras.main.width - this.body.halfWidth)
        if (this.body.x > this.scene.cameras.main.width - this.body.halfWidth)
        {
            
            console.log(`<< SCREEN WRAP << RIGHT TO LEFT`)
            this.body.x = 0 - this.body.halfWidth
        } 
        else if (this.body.x < 0 - this.body.halfWidth)
        {
            console.log(`>> SCREEN WRAP >> LEFT TO RIGHT`)
            this.body.x = this.scene.cameras.main.width - this.body.halfWidth
        }  
    }
    screenWrapY()
    {
        if (this.body.y > this.scene.scale.height - this.body.halfHeight)
        {
            
            console.log(`<< SCREEN WRAP << RIGHT TO LEFT`)
            this.body.y = 0 - this.body.halfHeight
        } 
        else if (this.body.y < 0 - this.body.halfHeight)
        {
            console.log(`>> SCREEN WRAP >> LEFT TO RIGHT`)
            this.body.y = this.scene.scale.height - this.body.halfHeight
        }
    }

    trackHitBox ()
    {
        this.hitBox.setPosition(this.body.x, this.body.y + 2)
    }

    trackHurtBox ()
    {
        this.hurtBox.setPosition(this.body.x - this.hurtBox_offset, this.body.y - 42)
        this.hurtBox.body.debugShowBody = !this.hurtBox.body.checkCollision.none
    }

    

    resetGravity ()
    {
        this.setGravityY(this.playerGravity)
        this.jumpPeakThreshold = -20
    }
    
    


    playerTakeDamage (hitBox, dummy)
    {
        console.log(`TEST PLAYER HIT CHECK`)
        this.dmgTaken = dummy.atkPoints
        this.scene.player_CONTROLLER.setState('take_damage')
    }

    damageEnd ()
    {
        this.isHurt = false
    }

    deactivatePlayerHurtbox ()
    {
        this.isAttacking = false
        this.isAttacking_AIR = false
        this.hurtBox.body.checkCollision.none = true
    }
    
    activatePlayerHurtbox ()
    {
        // console.log('ACTIVATE PLAYER HURTBOX')
        this.hurtBox.body.checkCollision.none = false
    }
}