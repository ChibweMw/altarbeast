import ALTAR_BELL_IDLE from "../states/altar_bell_idle.js"
import INTERACTABLE_INIT from "../states/altar_bell_init.js"
import ALTAR_BELL_START_INTERACTION from "../states/altar_bell_start_interaction.js"

let cnf_altar_bell_states

export default cnf_altar_bell_states = 
{
    init: INTERACTABLE_INIT,
    idle: ALTAR_BELL_IDLE,
    interaction_start: ALTAR_BELL_START_INTERACTION,
    // interaction_end: ,
    // inactive:,
    // activated:
}
