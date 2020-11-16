import VFX_COLLISION from "../VFX_Collision.js"
import cnf_vfx_collision_states from "./cnf_vfx_collision_states.js"

let cnf_vfx_collision_group
export default cnf_vfx_collision_group =
{
    group_name: 'GROUP_VFX_HIT',
    pool_name: 'GROUP_POOL_VFX_HIT',
    group_cnf: {
        classType: VFX_COLLISION,
        max: 1000,
        maxSize: 1000,
        visible: true,
        active: true,
        runChildUpdate: true,
        removeCallback: function (vfx_hit) {
            vfx_hit.scene.GROUP_POOL_VFX_HIT.add(vfx_hit)
        }
    },
    pool_cnf: {
        removeCallback: function (vfx_hit) {
            vfx_hit.scene.GROUP_VFX_HIT.add(vfx_hit)
        }
    },
    key: 'fx-hit-connect',
    frame: 0,
    states: cnf_vfx_collision_states,// cnf_vfx_decal_states,
    props: {
        testProp: 'THIS IS A TEST PROPERTY',
        group: null,
        pool: null,
        key: 'fx-hit-connect',
        spawnTimer: null
    }
}