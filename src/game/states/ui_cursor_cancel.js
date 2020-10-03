export default class UI_Cursor_Move_CANCEL
{
    /** @type {Phaser.Scene} */
    scene
    /** @type {Phaser.GameObjects.Sprite} */
    cursor

    /** 
     * @param {Phaser.Scene} scene  
     * 
     * */

    constructor (scene, cursor)
    {
        this.scene = scene
        this.cursor = cursor
    }

    enter ()
    {
        this.scene.stop()
        this.scene.wake(gameOptions.scene_prev)    
    }

}