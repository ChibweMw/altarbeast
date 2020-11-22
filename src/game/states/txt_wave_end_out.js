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
        // SHOULD GO TO WAIT STATE, TILL 'BELL' IS RANG
        // GameOptions.wave_manager.controlState.setState('intro')
        GameOptions.txt_title_manager.controlState.setState('wave_pre_round')
    }
    
    update ()
    {
        
    }

}