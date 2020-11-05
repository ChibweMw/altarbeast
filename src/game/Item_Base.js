import GameOptions from './GameOptions.js'
import Game from '../scenes/Game.js'

export default class Item_Base extends Phaser.Physics.Arcade.Sprite 
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
        this.setOrigin(0, 0)
        this.setActive(true)
        this.setVisible(true)
        this.setAlpha(1)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)

        // this.setGravityY(GameOptions.playerGravity / 10)

        this.setCollideWorldBounds(false)

        this.setDepth(7)
        this.controlState = undefined

        /**@type {Phaser.Tweens.Tween} */
        this.tween_flicker = undefined
        /**@type {Phaser.Tweens.Tween} */
        this.tween_left_right_motion = undefined

        this.readyToFlicker = true
        this.canWaver = true
    }

    setControlState(controlState)
    {
        this.controlState = controlState

    }

    tween_itemFlicker()
    {
        console.log('FLICKER TIIIME')
        // flash with a tween
        this.tween_flicker = this.scene.tweens.add({
            targets: this,
            // alpha: 0,
            alpha: { from: 1, to: 0.25,  },
            // tint: 0xffffff,
            duration: 1000,
            ease: 'Cubic.easeIn',
            yoyo: false,
            delay: 100,
            repeat: 5,
            onComplete: this.expiration,
            callbackScope: this,
        })
    }

    tween_fallWaver()
    {
        this.tween_left_right_motion = this.scene.tweens.add({
            targets: this,
            x: '-=32',
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1,
            callbackScope: this
        })
    }

    update()
    {
        if (this.canWaver && this.body.velocity.y > 0)
        {
            this.canWaver = false
            this.tween_fallWaver()
            this.setGravityY(GameOptions.playerGravity / 100)
        }

        if (this.readyToFlicker && this.body.blocked.down)
        {
            this.readyToFlicker = false
            this.tween_left_right_motion.stop()
            this.tween_itemFlicker()
        }
    }

    

    expiration()
    {
        this.scene.GROUP_ITEM.killAndHide(this)
        this.scene.GROUP_ITEM.remove(this)
    }
}