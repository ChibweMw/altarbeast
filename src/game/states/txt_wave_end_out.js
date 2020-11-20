import GameOptions from "../GameOptions.js"

export default class TXT_WAVE_END_OUT
{
    constructor (prefab)
    {
        this.prefab = prefab
        this.scene = prefab.scene
        this.intro_Played = false
    }

    enter ()
    {
        console.log('>>>>>>>>>>>>>>> END WAVE <<<<<<<<<<<<<<')
        GameOptions.wave_manager.controlState.setState('intro')
    }
    
    update ()
    {
        
    }

}