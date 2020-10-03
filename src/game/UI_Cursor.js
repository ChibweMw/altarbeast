export default class UI_Cursor extends Phaser.GameObjects.Sprite
{
    /** @param {Phaser.Scene} scene
     *  @param {number} x
     *  @param {number} y
     *  @param {string} texture
     * 
    */
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)

        this.setOrigin(1, 0.75)
    }
}