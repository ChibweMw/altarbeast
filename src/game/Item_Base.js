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

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)

        // this.setGravityY(GameOptions.playerGravity / 10)

        this.setCollideWorldBounds(false)

        this.setDepth(7)
        this.controlState = undefined
    }

    setControlState(controlState)
    {
        this.controlState = controlState

    }

    tween_itemFlicker()
    {
        // flash with a tween
    }

    update()
    {
        console.log('HAAAAAAAAAAAAAAAAAA')
        if (this.body.velocity.y > 0)
        {
            this.setGravityY(GameOptions.playerGravity / 25)
        }
        // CALL TIMED KILL FUNCTION

        // if (!this.anims.isPlaying)
        // {
        //     this.scene.GROUP_VFX_HIT.killAndHide(this)
        //     this.scene.GROUP_VFX_HIT.remove(this) 
        // }
    }

    timedExpiration()
    {
        // call item flicker tween
        // this.tween_itemFlicker()
        // clean up item when tween is completed using and onComplete callback
    }
}