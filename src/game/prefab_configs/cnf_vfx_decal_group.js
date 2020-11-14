import VFX_COLLISION from "../VFX_Collision.js"
import cnf_vfx_decal_states from "./cnf_vfx_decal_states.js"

let cnf_vfx_decal_group
export default cnf_vfx_decal_group =
{
    group_name: 'GROUP_VFX_DECAL',
    pool_name: 'GROUP_POOL_VFX_DECAL',
    group_cnf: {
        classType: VFX_COLLISION,
        max: 1000,
        maxSize: 1000,
        visible: true,
        active: true,
        runChildUpdate: true,
        removeCallback: function (vfx_decal) {
            vfx_decal.scene.GROUP_POOL_VFX_DECAL.add(vfx_decal)
        }
    },
    pool_cnf: {
        removeCallback: function (vfx_decal) {
            vfx_decal.scene.GROUP_VFX_DECAL.add(vfx_decal)
        }
    },
    key: 'fx-hit-enemy-death',
    frame: 0,
    states: cnf_vfx_decal_states,// cnf_vfx_decal_states,
    props: {
        testProp: 'THIS IS A TEST PROPERTY',
        group: null,
        pool: null,
        key: 'fx-hit-enemy-death'
    }
}