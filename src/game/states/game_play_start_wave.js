import GameOptions from "../GameOptions.js"
import cnf_waves_rounds from "../prefab_configs/cnf_waves_rounds.js"
import cnf_waves_set_rounds from "../prefab_configs/cnf_waves_set_rounds.js"

export default class PLAY_SCENE_START_WAVE
{
    constructor (prefab)
    {
        this.prefab = prefab
        this.CURR_ENEMY_WAVE = null
        this.CURR_ENEMY_ROUND = null
        this.curr_enemy_group = null
    }

    enter ()
    {

        // A WAVE IS A SET OF SEQUENCES
        // A WAVE IS A SET OF SEQUENCES
        // A WAVE IS A SET OF SEQUENCES
        // A WAVE IS A SET OF SEQUENCES
        // A WAVE IS A SET OF SEQUENCES

        this.prefab.wave_max_round_count = cnf_waves_rounds.length

        // console.log(`>>>>>>>>>>> GAME WAVE START STATE >>>>>>>>>>> ${cnf_waves_set_rounds}`)
        console.log(`>>>>>>>>>>> GAME WAVE START STATE`)
        // cnf_waves_set_rounds
        // let wave_conf =  cnf_waves_set_rounds(cnf_waves_rounds[1])
        let wave_conf =  cnf_waves_rounds[this.prefab.wave_round_count]
        this.CURR_ENEMY_WAVE = {
            callback: this.prefab.scene.spawnEnemy, 
            args: [ this.prefab.spawnPoints[0].x, this.prefab.spawnPoints[0].y, wave_conf.enemy_type ], 
            callbackScope: this.prefab.scene
        }
        this.CURR_ENEMY_WAVE = Object.assign(this.CURR_ENEMY_WAVE, wave_conf)

        this.prefab.TIMED_EVENT_ENEMY_SPAWN = this.prefab.scene.time.addEvent(this.CURR_ENEMY_WAVE)
        GameOptions.wave_entities_alive = this.prefab.TIMED_EVENT_ENEMY_SPAWN.repeat + 1
        // this.prefab.TIMED_EVENT_ENEMY_SPAWN = this.prefab.scene.time.addEvent({ delay: this.prefab.wave_delay, startAt: this.prefab.wave_delay / 2, callback: this.prefab.scene.spawnEnemy, args: [this.prefab.spawnPoints[0].x, this.prefab.spawnPoints[0].y, this.prefab.spawnAbles[0]], callbackScope: this.prefab.scene, repeat: this.prefab.wave_count})
    }
    
    update ()
    {
        // console.log(`>>>>> WAVE ENTITIES ${GameOptions.wave_entities_alive}`)
        if (this.prefab.TIMED_EVENT_ENEMY_SPAWN.repeatCount <= 0 && GameOptions.wave_entities_alive <= 0 || GameOptions.wave_entities_alive <= 0)
        {
            console.log(`WAVE COMPLEEEEETE!!! ${this.prefab.TIMED_EVENT_ENEMY_SPAWN.repeat + 1} spawns`)
            this.prefab.controlState.setState('update') // proceed to close out this wave and set up next
        }
    }

}