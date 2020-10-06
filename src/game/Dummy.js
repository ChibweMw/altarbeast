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

        this.setOrigin(0, 0)

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
        
    }

    dummyTakeDamage ()
    {
        // console.log('DUMMY BEEN HIT BY PLAYER')
        // CONTEXT OF 'this' IS ACTUALLY 'game' SCENE
        this.cameras.main.shake(100, 0.0025)
    }
}