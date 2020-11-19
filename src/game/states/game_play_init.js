import GameOptions from "../GameOptions.js"

export default class PLAY_SCENE_INIT
{
    // /** @param {Dummy} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`GAME INIT STATE`)
        this.prefab.controlState.setState('intro')
        // this.prefab.controlState.setState(this.prefab.startState)
    }
    
    update ()
    {

    }

}