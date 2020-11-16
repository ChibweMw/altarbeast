import VFX_COLLISION from "../VFX_Collision.js"
import cnf_vfx_collision_states from "./cnf_vfx_collision_states.js"

let cnf_vfx_jump_group
export default cnf_vfx_jump_group =
{
    group_name: 'GROUP_VFX_JUMP',
    pool_name: 'GROUP_POOL_VFX_JUMP',
    group_cnf: {
        classType: VFX_COLLISION,
        max: 1000,
        maxSize: 1000,
        visible: true,
        active: true,
        runChildUpdate: true,
        removeCallback: function (vfx_jump) {
            vfx_jump.scene.GROUP_POOL_VFX_JUMP.add(vfx_jump)
        }
    },
    pool_cnf: {
        removeCallback: function (vfx_jump) {
            vfx_jump.scene.GROUP_VFX_JUMP.add(vfx_jump)
        }
    },
    key: 'fx-player-jump',
    frame: 0,
    states: cnf_vfx_collision_states,// cnf_vfx_decal_states,
    props: {
        testProp: 'THIS IS A TEST PROPERTY',
        group: null,
        pool: null,
        key: 'fx-player-jump',
        spawnTimer: null
    }
}