export default class UI_Cursor extends Phaser.GameObjects.Sprite
{
    /** @type {Phaser.Scene} */
    scene
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
    }
}