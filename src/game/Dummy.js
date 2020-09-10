import Phaser from '../lib/phaser.js'

import GameOptions from '../GameOptions.js'


export default class Dummy extends Phaser.Physics.Arcade.Sprite 
{
    /**
     * @param {Phaser.Scene} Scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string || integer} frame
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

        this.enemyGravity =  GameOptions.enemyGravity

        this.currentFrame
        this.currentAnimation
        this.moveSpeed
        this.isHurt
        this.hurtTime
        this.isAlive
        this.isInvincible

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

        // Enemy Input State Machine
        this.controlState.update(this)

        // Enemy Animation State Machine
        this.animState.update(this)

        // Enemy Audio State Machine
        this.audioState.update(this)
    }
}