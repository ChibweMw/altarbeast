import AI_DEATH_SEQUENCE from "../states/ai_hopper_fish_death_sequence.js"
import AI_IDLE from "../states/ai_hopper_fish_idle.js"
import AI_IDLE_MOVE_FALL from "../states/ai_hopper_fish_move_fall.js"
import AI_IDLE_MOVE_JUMP from "../states/ai_hopper_fish_move_jump.js"
import AI_MOVE_LEFT from "../states/ai_hopper_fish_move_left.js"
import AI_MOVE_RIGHT from "../states/ai_hopper_fish_move_right.js"
import AI_TAKE_DAMAGE from "../states/ai_hopper_fish_take_damage.js"

let cnf_hopperfish
export default cnf_hopperfish =
{
    idle: AI_IDLE,
    move_left: AI_MOVE_LEFT,
    move_right: AI_MOVE_RIGHT,
    fall: AI_IDLE_MOVE_FALL,
    jump: AI_IDLE_MOVE_JUMP,
    take_damage: AI_TAKE_DAMAGE,
    death_sequence: AI_DEATH_SEQUENCE,
}