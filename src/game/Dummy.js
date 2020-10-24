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
        this.setGravity(0, GameOptions.playerGravity)

        this.vulnTime = 200

        this.init_walkSpeed = 0
        this.walkSpeed = 60
        this.curr_walkSpeed = this.init_walkSpeed


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
    
    update()
    {
        // console.log(`DUMMY VELOCITY Y : ${this.body.velocity.y}`)
        this.scene.training_dummy_CONTROLLER.update()
        this.setVelocityX(this.curr_walkSpeed)
    }
    
    dummyTakeDamage ()
    {
        if (this.name)
        {
            return
        }
        else
        {
            this.name = 'beenhit'
            // console.log('DUMMY BEEN HIT BY PLAYER')
            // CONTEXT OF 'this' IS ACTUALLY 'game' SCENE
            // this.isHit = true
            this.scene.cameras.main.shake(100, 0.0025)
            // this.setVelocityY(-700)
            this.setVelocity(200, -400)
            this.setBounceY(0.7)
            this.scene.time.delayedCall(this.vulnTime, this.recoverFromHit, null, this)
        }
    }
    
    recoverFromHit ()
    {
        this.name = ''
        this.setVelocity(0)
        console.log(`DUMMY VELOCITY Y : ${this.body.velocity.y}`)
    }
}