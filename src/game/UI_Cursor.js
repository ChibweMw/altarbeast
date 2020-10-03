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

    playSound_Nav ()
    {
        this.scene.sound.play('ui-cursor-nav')
    }
    
    playSound_Confirm ()
    {
        this.scene.sound.play('ui-ok')
    }
    
    playSound_Cancel ()
    {
        this.scene.sound.play('ui-cancel')
    }
}