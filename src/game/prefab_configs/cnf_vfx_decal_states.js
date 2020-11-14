import AI_VFX_DECAL_INIT from "../states/ai_vfx_decal_init.js"
import AI_VFX_DECAL_LIFESPAN from "../states/ai_vfx_decal_lifeSpan.js"

let cnf_vfx_decal_states
export default cnf_vfx_decal_states =
{
    init: AI_VFX_DECAL_INIT,
    recycle: AI_VFX_DECAL_LIFESPAN
}