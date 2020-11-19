import GameOptions from "../GameOptions.js"

export default class PLAY_SCENE_INTRO
{
    // /** @param {Dummy} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`GAME INTRO STATE`)
        this.prefab.controlState.setState('start')
    }
    
    update ()
    {

    }

}