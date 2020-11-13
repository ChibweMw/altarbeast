import AI_DEATH_SEQUENCE from "../states/ai_dummy_death_sequence.js";
import AI_IDLE from "../states/ai_dummy_idle.js";
import AI_DUMMY_INIT from "../states/ai_dummy_init.js";
import AI_IDLE_MOVE_FALL from "../states/ai_dummy_move_fall.js";
import AI_MOVE_LEFT from "../states/ai_dummy_move_left.js";
import AI_MOVE_RIGHT from "../states/ai_dummy_move_right.js";
import AI_TAKE_DAMAGE from "../states/ai_dummy_take_damage.js";


let cnf_dummy_states

export default cnf_dummy_states = 
{
    init: AI_DUMMY_INIT,
    idle: AI_IDLE,
    move_left: AI_MOVE_LEFT,
    move_right: AI_MOVE_RIGHT,
    fall: AI_IDLE_MOVE_FALL,
    take_damage: AI_TAKE_DAMAGE,
    death_sequence: AI_DEATH_SEQUENCE,
}

