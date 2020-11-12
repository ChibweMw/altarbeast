import Dummy from "../Dummy.js"
import GameOptions from "../GameOptions.js"
import cnf_dummy_states from "./cnf_dummy_states.js"

let cnf_dummy_group
export default cnf_dummy_group = 
{
    group_name: 'GROUP_training_dummy',
    pool_name: 'GROUP_POOL_training_dummy',
    group_cnf: {
        classType: Dummy,
        // key: 'dummy',
        // frame: 0,
        max: 10,
        maxSize: 10,
        allowGravity: true,
        visible: false,
        runChildUpdate: true,
        gravityY: GameOptions.playerGravity,
        removeCallback: function (dummy) {
            dummy.scene.GROUP_POOL_training_dummy.add(dummy)
        }
    },
    pool_cnf: {
        removeCallback: function (dummy) {
            dummy.scene.GROUP_training_dummy.add(dummy)
        }
    },
    states: cnf_dummy_states
}