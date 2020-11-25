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
        max: 10,
        maxSize: 10,
        allowGravity: true,
        visible: true,
        active: true,
        runChildUpdate: true,
        gravityY: GameOptions.playerGravity,
        collideWorldBounds: false,
        bounceX: 0,
        bounceY: 0,
        removeCallback: function (dummy) {
            dummy.scene.GROUP_POOL_training_dummy.add(dummy)
            // dummy.data.values.props.pool.add(dummy)
        }
    },
    pool_cnf: {
        removeCallback: function (dummy) {
            dummy.scene.GROUP_training_dummy.add(dummy)
            // dummy.data.values.props.group.add(dummy)
            
        }
    },
    states: cnf_dummy_states,
    key: 'dummy',
    frame: 0,
    props: {
        testProp: 'THIS IS A TEST PROPERTY',
        maxHP: 1,
        isHurt: false,
        group: null,
        pool: null,
        key: 'dummy',
        texFrame: 0,
        startState: 'move_right',

        // TO ADD
        // KNOCKBACK STATS
        // MOVEMENT
        // ANIMATIONS
        // COMBAT STATS
        // 
    }
}