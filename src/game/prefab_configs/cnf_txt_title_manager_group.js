import Dummy from "../Dummy.js"
import GameOptions from "../GameOptions.js"
import Hopper from "../Hopper_Fish.js"
import Wave_Manager from "../Wave_Manager.js"
import cnf_dummy_group from "./cnf_dummy_group.js"
import cnf_hopperFish_group from "./cnf_hopperFish_group.js"
import cnf_txt_title_manager_play_states from "./cnf_txt_title_manager_play_states.js"

let cnf_txt_title_manager_group
export default cnf_txt_title_manager_group = 
{
    group_name: 'GROUP_txt_title_manager',
    pool_name: 'GROUP_POOL_txt_title_manager',
    group_cnf: {
        classType: Wave_Manager,
        max: 1,
        maxSize: 1,
        allowGravity: false,
        visible: false,
        active: true,
        runChildUpdate: true,
        removeCallback: function (wave_manager) {
            wave_manager.scene.GROUP_POOL_txt_title_manager.add(wave_manager)
        }
    },
    pool_cnf: {
        removeCallback: function (wave_manager) {
            wave_manager.scene.GROUP_txt_title_manager.add(wave_manager)
        }
    },
    states: cnf_txt_title_manager_play_states,
    props: {
        group: null,
        pool: null,
        controlState: null,
        startState: 'intro',
    }
}