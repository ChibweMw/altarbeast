import Player_ATTACK_CROUCHING from "../states/player_attack_crouch.js"
import Player_ATTACK_JUMPING from "../states/player_attack_jumping.js"
import Player_ATTACK_STANDING from "../states/player_attack_standing.js"
import Player_Crouch from "../states/player_crouch.js"
import PLAYER_DEATH_SEQUENCE from "../states/player_death_sequence.js"
import Player_FALL from "../states/player_fall.js"
import Player_Idle from "../states/player_idle.js"
import Player_MOVE_JUMP from "../states/player_move_jump.js"
import Player_MOVE_LEFT from "../states/player_move_left.js"
import Player_MOVE_RIGHT from "../states/player_move_right.js"
import Player_TAKE_DAMAGE from "../states/player_take_damage.js"

let cnf_oni
export default cnf_oni =
{
    idle: Player_Idle,
    crouch: Player_Crouch,
    jump: Player_MOVE_JUMP,
    fall: Player_FALL,
    left: Player_MOVE_LEFT,
    right: Player_MOVE_RIGHT,
    take_damage: Player_TAKE_DAMAGE,
    death: PLAYER_DEATH_SEQUENCE,
    stand_atk_norm: Player_ATTACK_STANDING,
    jump_atk_norm: Player_ATTACK_JUMPING,
    crouch_atk_norm: Player_ATTACK_CROUCHING
}