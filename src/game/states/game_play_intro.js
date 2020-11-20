// wwill use to intro the stage if in the very beginning, then present the next wave

import GameOptions from "../GameOptions.js"

// In a title card type presentation  
export default class PLAY_SCENE_INTRO
{

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`GAME INTRO STATE`)
        // this.prefab.controlState.setState('start')
        // GameOptions.txt_title_manager.controlState.setState('wave_title_in')
    }
    
    update ()
    {
        if (!GameOptions.txt_title_manager.controlState)
        {
            return
        } else
        {
            GameOptions.txt_title_manager.controlState.setState('wave_title_in')
        }

    }

}