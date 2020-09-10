import Phaser from '../../lib/phaser.js'

export default class Hurtbox extends Phaser.GameObjects.Zone 
{
    /**
     * @param {Phaser.Scene} Scene
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */

    constructor (scene, x, y, width, height)
    {
        super(scene, x, y, width, height)
    }


}