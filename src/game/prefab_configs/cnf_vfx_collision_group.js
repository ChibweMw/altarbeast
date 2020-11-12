import VFX_COLLISION from "../VFX_Collision.js"

let cnf_vfx_collision_group
export default cnf_vfx_collision_group =
{
    group_name: 'GROUP_VFX_HIT',
    pool_name: 'GROUP_POOL_VFX_HIT',
    group_cnf: {
        classType: VFX_COLLISION,
        max: 100,
        maxSize: 100,
        visible: false,
        runChildUpdate: true,
        removeCallback: function (vfx_hit) {
            vfx_hit.scene.GROUP_POOL_VFX_HIT.add(vfx_hit)
        }
    },
    pool_cnf: {
        removeCallback: function (vfx_hit) {
            vfx_hit.scene.GROUP_VFX_HIT.add(vfx_hit)
        }
    }
}