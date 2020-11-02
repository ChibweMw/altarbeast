import GameOptions from './GameOptions.js'
import Game from '../scenes/Game.js'

export default class VFX_COLLISION extends Phaser.GameObjects.Sprite
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

        this.setDepth(7)
        this.controlState = undefined
    }

    setControlState(controlState)
    {
        this.controlState = controlState

    }

    update()
    {
        if (!this.anims.isPlaying)
        {
            this.scene.GROUP_VFX_HIT.killAndHide(this)
            this.scene.GROUP_VFX_HIT.remove(this) 
        }
    }
}