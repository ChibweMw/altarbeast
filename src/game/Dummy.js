import GameOptions from './GameOptions.js'
import Game from '../scenes/Game.js'


export default class Dummy extends Phaser.Physics.Arcade.Sprite 
{
    /**
     * @param {Game} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string | integer} frame
     */
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)

        this.scene = scene
        
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)

        this.controlState = undefined
        this.animState = undefined
        this.audioState = undefined

        this.atkPoints = 1

        this.setOrigin(0, 0)
        this.setGravityY(GameOptions.playerGravity)

        this.vulnTime = 500

        this.init_walkSpeed = -40
        this.walkSpeed = 60
        this.curr_walkSpeed = this.init_walkSpeed

        this.setCollideWorldBounds(false)
        this.setBounce(0)



        // this.enemyGravity =  GameOptions.enemyGravity

        // this.currentFrame
        // this.currentAnimation
        // this.moveSpeed
        // this.isHurt
        // this.hurtTime
        // this.isAlive
        // this.isInvincible

        // this.onGround

        // this.hurtBoxX
        // this.hurtBoxY
        // this.hurtBoxWidth
        // this.hurtBoxHeight

        
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

    switchXDir()
    {
        this.curr_walkSpeed = -this.curr_walkSpeed
    }

    screenWrapX()
    {
        if (this.body.x > this.scene.scale.width - this.body.halfWidth)
        {
            
            console.log(`<< SCREEN WRAP << RIGHT TO LEFT`)
            this.body.x = 0 - this.body.halfWidth
        } 
        else if (this.body.x < 0 - this.body.halfWidth)
        {
            console.log(`>> SCREEN WRAP >> LEFT TO RIGHT`)
            this.body.x = this.scene.scale.width - this.body.halfWidth
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
    
    update()
    {
        // console.log(`DUMMY VELOCITY Y : ${this.body.velocity.y}`)
        this.scene.training_dummy_CONTROLLER.update()
        // this.setVelocityX(this.curr_walkSpeed)
        this.body.blocked.left || this.body.blocked.right ? this.switchXDir() : console.log(`DUMMY WALKSPEED >> ${this.curr_walkSpeed}`)
        !this.name && this.body.blocked.down ? this.setVelocityX(this.curr_walkSpeed) : console.log('DUMMY can move')
        
        this.screenWrapX()
        this.screenWrapY()
    }
    
    dummyTakeDamage (player, dummy)
    {
        if (this.name)
        {
            return
        }
        else
        {
            this.name = 'beenhit'
            // console.log('DUMMY BEEN HIT BY PLAYER')
            console.log(`DUMMY >> ${dummy}`)
            console.log(`PLAYER >> ${player}`)
            
            let recoil = 100
            let xMult = 5
            let yMult = 4
            let xVel = 0
            player.body.x < this.body.x ? xVel = recoil * xMult : xVel = -recoil * xMult
            let yVel = -recoil * yMult
            this.setVelocity(xVel, yVel)
        
            this.setDamping(true)
            this.setDragX(0.85)
            this.setBounce(1, 0.7)
            // this.setDragY(0.75)

            this.setTintFill(0xffffff);
            this.scene.tweens.add({
                targets: this,
                // alpha: 0,
                alpha: { from: 1, to: 0.5 },
                // tint: 0xffffff,
                duration: 50,
                ease: 'Cubic.easeInOut',
                yoyo: true,
                repeat: 5,
            })

            // CONTEXT OF 'this' IS ACTUALLY 'game' SCENE
            // this.isHit = true
            this.scene.cameras.main.shake(100, 0.0025)
            // this.setVelocityY(-700)
            // this.setVelocity(200, -400)
            // this.setBounceY(0.7)
            // this.setBounce(0.85)
            this.scene.time.delayedCall(this.vulnTime, this.recoverFromHit, null, this)
        }
    }
    
    recoverFromHit ()
    {
        this.name = ''
        this.setBounce(0)
        this.setDragX(1)
        // this.setDragY(1)
        this.setDamping(false)
        this.clearTint()
        // this.setVelocity(0)
        console.log(`DUMMY VELOCITY X : ${this.body.velocity.x}`)
        console.log(`DUMMY VELOCITY Y : ${this.body.velocity.y}`)
    }
}