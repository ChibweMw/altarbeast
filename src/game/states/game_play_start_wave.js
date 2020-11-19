import GameOptions from "../GameOptions.js"

export default class PLAY_SCENE_START_WAVE
{
    // /** @param {Dummy} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`GAME START STATE`)
        this.prefab.controlState.setState('pause')
    }
    
    update ()
    {

    }

}