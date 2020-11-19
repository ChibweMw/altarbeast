import Dummy from "../Dummy.js"
import GameOptions from "../GameOptions.js"
import Hopper from "../Hopper_Fish.js"
import cnf_wave_manager_play_states from "./cnf_wave_manager_play_states.js"

let cnf_wave_manager_group
export default cnf_wave_manager_group = 
{
    group_name: 'GROUP_wave_manager',
    pool_name: 'GROUP_POOL_wave_manager',
    group_cnf: {
        classType: Phaser.GameObjects.Zone,
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
    }
}