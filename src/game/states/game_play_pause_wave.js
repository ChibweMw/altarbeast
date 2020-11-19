import GameOptions from "../GameOptions.js"

export default class PLAY_SCENE_PAUSE_WAVE
{
    // /** @param {Dummy} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`GAME PAUSE STATE`)
        this.prefab.controlState.setState('end')
    }
    
    update ()
    {

    }

}