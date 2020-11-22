import GameOptions from "../GameOptions.js"

export default class TXT_WAVE_PRE_ROUND
{
    constructor (prefab)
    {
        this.prefab = prefab
        this.scene = prefab.scene
        this.intro_Played = false
    }

    enter ()
    {
        console.log('>>>>>>>>>>>>>>> PRE WAVE STATE!!! HIT THE BELL <<<<<<<<<<<<<<')
        // SHOULD GO TO WAIT STATE, TILL 'BELL' IS RANG
        // listen for 'BELL_DID_RIGN' event
        GameOptions.wave_manager.controlState.setState('start')
    }
    
    update ()
    {
        
    }

}