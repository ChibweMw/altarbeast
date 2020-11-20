import GameOptions from "../GameOptions.js"

export default class PLAY_SCENE_END_WAVE
{
    // /** @param {Dummy} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`GAME END STATE`)
        // this.prefab.controlState.setState('intro')
        GameOptions.txt_title_manager.controlState.setState('wave_end_in')
    }
    
    update ()
    {

    }

}