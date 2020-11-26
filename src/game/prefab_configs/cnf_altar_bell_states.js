import ALTAR_BELL_ACTIVATE from "../states/altar_bell_activate.js"
import ALTAR_BELL_DEACTIVATE from "../states/altar_bell_deactivate.js"
import ALTAR_BELL_IDLE from "../states/altar_bell_idle.js"
import INTERACTABLE_INIT from "../states/altar_bell_init.js"
import ALTAR_BELL_END_INTERACTION from "../states/altar_bell_interaction_end.js"
import ALTAR_BELL_START_INTERACTION from "../states/altar_bell_interaction_start.js"

let cnf_altar_bell_states

export default cnf_altar_bell_states = 
{
    init: INTERACTABLE_INIT,
    idle: ALTAR_BELL_IDLE,
    interaction_start: ALTAR_BELL_START_INTERACTION,
    interaction_end: ALTAR_BELL_END_INTERACTION,
    deactivate: ALTAR_BELL_DEACTIVATE,
    activated: ALTAR_BELL_ACTIVATE
}
