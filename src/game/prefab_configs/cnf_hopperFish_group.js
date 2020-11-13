import GameOptions from "../GameOptions.js"
import Hopper from "../Hopper_Fish.js"
import cnf_hopperFish_states from "./cnf_hopperFish_states.js"

let cnf_hopperFish_group
export default cnf_hopperFish_group = 
{
    group_name: 'GROUP_hopFish',
    pool_name: 'GROUP_POOL_hopFish',
    group_cnf: {
        classType: Hopper,
        max: 10,
        maxSize: 10,
        allowGravity: true,
        visible: true,
        active: true,
        runChildUpdate: true,
        gravityY: GameOptions.playerGravity,
        removeCallback: function (hopfish) {
            hopfish.scene.GROUP_POOL_hopFish.add(hopfish)
        }
    },
    pool_cnf: {
        removeCallback: function (hopfish) {
            hopfish.scene.GROUP_hopFish.add(hopfish)
        }
    },
    states: cnf_hopperFish_states,
    key: 'enemy-fish',
    frame: 2,
    props: {
        testProp: 'THIS IS A TEST PROPERTY'
    }
}