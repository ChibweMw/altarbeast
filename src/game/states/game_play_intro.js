// wwill use to intro the stage if in the very beginning, then present the next wave

import GameOptions from "../GameOptions.js"

// In a title card type presentation  
export default class PLAY_SCENE_INTRO
{

    constructor (prefab)
    {
        this.prefab = prefab
        this.camera_Faded_IN = false
    }

    enter ()
    {
        console.log(`GAME INTRO STATE`)
        // this.camera_Faded_IN = false
        // this.prefab.controlState.setState('start')
        // GameOptions.txt_title_manager.controlState.setState('wave_title_in')
        // this.prefab.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
        //     /**
        //      * wait for 'game' scene to finish fade-in
        //      * then do following code
        //      */
        //     console.log(`XDXDXDXDXDXDXDXDXDXDXDXD`)
            
        //     // GameOptions.txt_title_manager.controlState.setState('wave_title_in')
            
        // }, this)
        this.camera_Faded_IN = true
    }
    
    update ()
    {
        if (this.camera_Faded_IN && GameOptions.txt_title_manager.controlState)
        {
            this.camera_Faded_IN = false
            GameOptions.txt_title_manager.controlState.setState('wave_title_in')
            // return
        } //else
        // {
        // }

    }

}