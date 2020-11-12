import Dummy from "../Dummy.js"
import GameOptions from "../GameOptions.js"

let cnf_dummy_group
export default cnf_dummy_group = 
{
    group_name: 'GROUP_training_dummy',
    pool_name: 'GROUP_POOL_training_dummy',
    group_cnf: {
        classType: Dummy,
        max: 10,
        maxSize: 10,
        allowGravity: true,
        visible: false,
        active: false,
        gravityY: GameOptions.playerGravity,
        removeCallback: function (dummy) {
            dummy.scene.GROUP_POOL_training_dummy.add(dummy)
        }
    },
    pool_cnf: {
        removeCallback: function (dummy) {
            dummy.scene.GROUP_training_dummy.add(dummy)
        }
    }
}