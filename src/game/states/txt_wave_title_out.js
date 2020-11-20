import GameOptions from "../GameOptions.js"

export default class TXT_WAVE_TITLE_OUT
{
    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`WAVE TITLE OUT!!!`)
        GameOptions.wave_manager.controlState.setState('start')
    }
    
    update ()
    {

    }

}