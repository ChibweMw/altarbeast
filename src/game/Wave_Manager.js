import Game from '../scenes/Game.js'

export default class Wave_Manager extends Phaser.GameObjects.Zone 
{
    /**
     * @param {Game} scene
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    constructor(scene, x, y, width, height)
    {
        super(scene, x, y, width, height)

        this.controlState = null
    }

    update()
    {
        this.controlState.update()
    }
}