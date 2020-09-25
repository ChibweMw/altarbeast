// import Phaser from '../lib/phaser.js'

import GameOptions from './GameOptions.js'


export default class Player extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string} frame
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

        this.playerGravity =  GameOptions.playerGravity
        this.playerJumpForce = GameOptions.playerJumpForce
        this.playerJumpCount = GameOptions.playerJumpCount

        this.jumpCount = 0

        this.HP
        this.AP
        this.currentFrame
        this.currentAnimation
        this.walkSpeed
        this.jumpVelocity
        this.isHurt
        this.hurtTime
        this.isAlive
        this.isInvincible
        this.canControl
        this.canCombo
        this.canAttack
        this.isAttacking
        this.attackBufferTime
        this.usingAbility
        this.isJumping
        this.jumpPressed
        this.jumpBufferTime

        this.onGround

        this.hurtBoxX
        this.hurtBoxY
        this.hurtBoxWidth
        this.hurtBoxHeight  
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
        if (!this.controlState)
        {
            console.log(`control state >> ${this.controlState}`)
            return
        }

        if (!this.animState) {
            console.log(`anim state >> ${this.animState}`)
            return
        }

        if (!this.audioState)
        {
            console.log(`audio state >> ${this.audioState}`)
            return
        }

        // Player Input State Machine
        this.controlState.update(this)

        // Player Animation State Machine
        this.animState.update(this)

        // Player Audio State Machine
        this.audioState.update(this)
    }
}