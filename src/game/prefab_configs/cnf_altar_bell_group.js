import GameOptions from "../GameOptions.js"
import Interactable from "../Interactable.js"
import cnf_altar_bell_states from "./cnf_altar_bell_states.js"

let cnf_altar_bell_group
export default cnf_altar_bell_group =
{
    group_name: 'GROUP_ALTAR_BELL',
    pool_name: 'GROUP_POOL_ALTAR_BELL',
    group_cnf: {
        classType: Interactable,
        max: 1,
        maxSize: 1,
        allowGravity: false,
        visible: true,
        runChildUpdate: true,
        removeCallback: function (item) {
            item.scene.GROUP_POOL_ALTAR_BELL.add(item)
        }
    },
    pool_cnf: {
        removeCallback: function (item) {
            item.scene.GROUP_ALTAR_BELL.add(item)
        }
    },
    states: cnf_altar_bell_states,
    key: 'altar-bell',
    props: {
        group: null,
        pool: null,
        key: 'altar-bell',
        texFrame: 1,
        startState: 'idle',
        interactionBegin: 'interaction_start'

    }
}