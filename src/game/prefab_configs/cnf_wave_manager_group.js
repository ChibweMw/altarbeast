import Dummy from "../Dummy.js"
import GameOptions from "../GameOptions.js"
import Hopper from "../Hopper_Fish.js"
import Wave_Manager from "../Wave_Manager.js"
import cnf_dummy_group from "./cnf_dummy_group.js"
import cnf_hopperFish_group from "./cnf_hopperFish_group.js"
import cnf_wave_manager_play_states from "./cnf_wave_manager_play_states.js"

let cnf_wave_manager_group
export default cnf_wave_manager_group = 
{
    group_name: 'GROUP_wave_manager',
    pool_name: 'GROUP_POOL_wave_manager',
    group_cnf: {
        classType: Wave_Manager,
        max: 1,
        maxSize: 1,
        allowGravity: false,
        visible: false,
        active: true,
        runChildUpdate: true,
        removeCallback: function (wave_manager) {
            wave_manager.scene.GROUP_POOL_wave_manager.add(wave_manager)
        }
    },
    pool_cnf: {
        removeCallback: function (wave_manager) {
            wave_manager.scene.GROUP_wave_manager.add(wave_manager)
        }
    },
    states: cnf_wave_manager_play_states,
    props: {
        group: null,
        pool: null,
        controlState: null,
        startState: 'intro',
        spawnPoints : null,
        spawnAbles: [cnf_dummy_group, cnf_hopperFish_group],
        wave_round_count: 0,
        wave_max_round_count: 50,
        wave_count: 5,
        wave_delay: 2000,
        TIMED_EVENT_ENEMY_SPAWN: null
    }
}