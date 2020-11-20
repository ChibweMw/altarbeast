import GameOptions from "../GameOptions.js"
import cnf_waves_rounds from "../prefab_configs/cnf_waves_rounds.js"
import cnf_waves_set_rounds from "../prefab_configs/cnf_waves_set_rounds.js"

export default class PLAY_SCENE_UPDATE_WAVE
{
    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        this.prefab.wave_round_count++
        GameOptions.wave_round = this.prefab.wave_round_count
        console.log(`WAVE ROUND >> ${this.prefab.wave_round_count} COMPLEEEEETE!!!`)
    }
    
    update ()
    {
        // console.log(`>>>>> WAVE ENTITIES ${GameOptions.wave_entities_alive}`)

        if ( this.prefab.wave_round_count >= this.prefab.wave_max_round_count )
        {
            this.prefab.wave_round_count = 0
            console.log(`WAVE COMPLEEEEETE!!! ROUND END!`)
            this.prefab.controlState.setState('end') // proceed to close out this wave and set up next
        }
        else
        {
            console.log(`WAVE COMPLEEEEETE!!! NEXT WAVE!`)
            this.prefab.controlState.setState('start') // proceed to close out this wave and set up next
        }
    }

}