import VFX_COLLISION from "../VFX_Collision.js"
import cnf_vfx_collision_states from "./cnf_vfx_collision_states.js"

let cnf_vfx_land_group
export default cnf_vfx_land_group =
{
    group_name: 'GROUP_VFX_LAND',
    pool_name: 'GROUP_POOL_VFX_LAND',
    group_cnf: {
        classType: VFX_COLLISION,
        max: 1000,
        maxSize: 1000,
        visible: true,
        active: true,
        runChildUpdate: true,
        removeCallback: function (vfx_land) {
            vfx_land.scene.GROUP_POOL_VFX_LAND.add(vfx_land)
        }
    },
    pool_cnf: {
        removeCallback: function (vfx_land) {
            vfx_land.scene.GROUP_VFX_LAND.add(vfx_land)
        }
    },
    key: 'fx-player-land',
    frame: 0,
    states: cnf_vfx_collision_states,// cnf_vfx_decal_states,
    props: {
        testProp: 'THIS IS A TEST PROPERTY',
        group: null,
        pool: null,
        key: 'fx-player-land',
        spawnTimer: null
    }
}