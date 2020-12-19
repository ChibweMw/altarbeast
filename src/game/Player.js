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

        

        this.hitBox_WIDTH = 8
        this.hitBox_HEIGHT = 32
        this.hitBox = this.scene.add.zone(this.body.x + 4, this.body.y, this.hitBox_WIDTH, this.hitBox_HEIGHT)
        this.scene.add.existing(this.hitBox)
        this.scene.physics.world.enable(this.hitBox)
        this.hitBox.setOrigin(0, 0)

        // this.hurtBox = this.scene.add.zone(this.body.x, this.body.y, 48, 32)
        this.hurtBox = this.scene.add.sprite(this.body.x, this.body.y, 'oni-club-swing-01')
        this.scene.add.existing(this.hurtBox)
        this.scene.physics.world.enable(this.hurtBox)

        this.hurtBox.body.checkCollision.none = true

        this.hurtBox.setOrigin(0, 0)
        
        // this.hurtBox.frame.x
        
        this.hurtBox.setFlipX(true)
        this.hurtBox.setVisible(false)

        // ARCADE BODY OFFSET
        this.hurtBox_offsetX = 0
        this.hurtBox_offsetY = 16

        this.hurtBox.body.setSize(72, 30, true)
        // this.hurtBox.setSizeToFrame(this.hurtBox.frame)
        this.hurtBox.body.setOffset( 0, 0)
        
        
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
        this.HP = GameOptions.playerStartHP
        this.AP = GameOptions.playerStartAP
        this.gained_HP = 0
        this.dmgTaken = 0
        this.isHurt = false
        this.hurtTime = 500
        this.hurtForce = -100

        
        this.isAttacking = false
        this.isAttacking_AIR = false
        this.atkActiveTime = 300
        this.jumpPressed = false
        this.isJumping = false
        this.jumpCount = GameOptions.player_JumpCount
        this.jumpHangTime = 120
        this.jumpPeakThreshold = -20
        this.jumpPressBufferTime = 200

        this.startFallY = undefined
        this.endFallY = undefined
        
        this.isAlive = true
        // this.currentFrame
        // this.currentAnimation
        // this.isInvincible

        this.setGravityY(this.playerGravity)
        // this.setCollideWorldBounds(true)
        this.setCollideWorldBounds(false)
        this.setSize(16, 32)
        // this.setOffset(16, this.body.halfHeight)
        this.setOffset(16, 16)
        this.setFlipX(true)
        this.setOrigin(0, 1)

        this.body.debugBodyColor = 0xfff999
        // this.debugBodyColor = 0x008000

        // this.scene.cameras.main.startFollow(this, true, 0.9, 1)
        // this.setupOverlapEvents(this)
    }

    // MAKE OVERLAP COLLIDER ONLY TRACK THE START OF AN OVERLAP EVENT
    // setupOverlapEvents(){
    //     this.on("overlapstart", function() {
    //         // console.log(">>>>> OVERLAP STARTO <<<<<")
    //         this.controlState.setState('take_damage')
    //         // debugger
    //         // this.scene.player_CONTROLLER.setState('take_damage')

    
    //         // console.time("overlap")
    //       })

    //     this.on("overlapend", function() {
    //         // console.log(">>>>> OVERLAP ENDO <<<<<")
    //         // console.timeEnd("overlap")
    //     })
    // }

    setupOverlapEvents(prefab){
        prefab.on("overlapstart", function() {
            // console.log(">>>>> OVERLAP STARTO <<<<<")
            prefab.controlState.setState('take_damage')
            // debugger
            // prefab.scene.player_CONTROLLER.setState('take_damage')

    
            // console.time("overlap")
          })

        prefab.on("overlapend", function() {
            // console.log(">>>>> OVERLAP ENDO <<<<<")
            // console.timeEnd("overlap")
        })
    }

    // setControlState(controlState)
    // {
    //     this.controlState = controlState
    // }
    
    

    update()
    {
        this.controlState.update()
        this.trackHitBox()

        // this.setHurtBox_Size(this.hurtBox.frame)
        this.trackHurtBox()

        // console.log(`JUMP COUNT '${this.jumpCount}'`)
        // console.log(`IS JUMPING '${this.isJumping}'`)
        this.setVelocityX(this.walkSpeed)
        // this.scene.player_CONTROLLER.update()
        
        // this.screenWrapX()
        // this.screenWrapY()

        // this.trackOverlapEvents(this)
        
    }

    trackHitBox ()
    {
        this.hitBox.setPosition(this.body.x + 4, this.body.y)
    }

    setHurtBox_Size(frame){
        this.hurtBox.setSizeToFrame(frame)
    }

    trackHurtBox ()
    {
        // this.hurtBox.setPosition(this.body.x - this.hurtBox_offset, this.body.y - 42)
        // this.hurtBox.setPosition(this.body.x - this.hurtBox_offset, this.body.y - 12)
        this.hurtBox.setPosition(this.body.x - this.hurtBox_offsetX , this.body.y - this.hurtBox_offsetY)
        // this.hurtBox.setPosition(this.body.x, this.body.y - this.hurtBox_offsetY)
        this.hurtBox.body.debugShowBody = !this.hurtBox.body.checkCollision.none

        // this.hurtBox.body.setOffset( this.hurtBox_offsetX, this.hurtBox_offsetY)
    }

    trackOverlapEvents(prefab)
    {
        // Treat 'embedded' as 'touching' also
        // if (this.hitBox.body.embedded) this.hitBox.body.touching.none = false
        if (prefab.hitBox.body.embedded) prefab.hitBox.body.touching.none = false

        // var touching = !this.hitBox.body.touching.none
        // var wasTouching = !this.hitBox.body.wasTouching.none
        var touching = !prefab.hitBox.body.touching.none
        var wasTouching = !prefab.hitBox.body.wasTouching.none

        if (touching && !wasTouching) 
        {
            // console.log('OVERLAP START')
            // this.emit("overlapstart")
            prefab.emit("overlapstart")
        }
        else if (!touching && wasTouching) 
        {
            // console.log('OVERLAP END')
            // this.emit("overlapend")
            prefab.emit("overlapend")
        }
    }

    screenWrapX()
    {
        // if (this.body.x > this.scene.scale.width - this.body.halfWidth)
        // if (this.body.x > this.scene.cameras.main.width + this.scene.cameras.main.width - this.body.halfWidth)
        if (this.body.x > this.scene.cameras.main.width - this.body.halfWidth)
        {
            
            // console.log(`<< SCREEN WRAP << RIGHT TO LEFT`)
            this.body.x = 0 - this.body.halfWidth
        } 
        else if (this.body.x < 0 - this.body.halfWidth)
        {
            // console.log(`>> SCREEN WRAP >> LEFT TO RIGHT`)
            this.body.x = this.scene.cameras.main.width - this.body.halfWidth
        }  
    }
    screenWrapY()
    {
        if (this.body.y > this.scene.scale.height - this.body.halfHeight)
        {
            
            // console.log(`<< SCREEN WRAP << RIGHT TO LEFT`)
            this.body.y = 0 - this.body.halfHeight
        } 
        else if (this.body.y < 0 - this.body.halfHeight)
        {
            // console.log(`>> SCREEN WRAP >> LEFT TO RIGHT`)
            this.body.y = this.scene.scale.height - this.body.halfHeight
        }
    }

    

    

    resetGravity ()
    {
        this.setGravityY(this.playerGravity)
        this.jumpPeakThreshold = -20
    }
    
    


    playerTakeDamage (hitBox, dummy)
    {
        // console.log(`TEST PLAYER HIT CHECK`)
        this.dmgTaken = dummy.atkPoints
        // this.scene.player_CONTROLLER.setState('take_damage')
    }

    damageEnd ()
    {
        this.isHurt = false
    }

    deactivatePlayerHurtbox ()
    {
        this.isAttacking = false
        this.isAttacking_AIR = false
        this.hurtBox.setVisible(false)
        // this.hurtBox.body.checkCollision.none = true
    }
    
    activatePlayerHurtbox ()
    {
        if (this.isHurt)
        {
            return
        } else
        {
            // console.log('ACTIVATE PLAYER HURTBOX')
            this.hurtBox.setVisible(true)
            this.hurtBox.anims.play('anim-oni-club-swing-01')
            this.scene.sound.play('player-attack')
            this.hurtBox.body.checkCollision.none = false
        }
    }
}